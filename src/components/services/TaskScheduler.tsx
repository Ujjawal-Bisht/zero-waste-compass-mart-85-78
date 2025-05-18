
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Loader2, Play } from 'lucide-react';

interface Task {
  id: string;
  name: string;
  task_type: string;
  schedule: string;
  next_run: string;
  last_run: string | null;
  enabled: boolean;
  parameters: Record<string, any> | null;
}

interface TaskHistoryItem {
  id: string;
  task_id: string;
  status: string;
  result: string | null;
  started_at: string;
  completed_at: string | null;
}

const TaskScheduler: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [isRunningTask, setIsRunningTask] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [taskHistory, setTaskHistory] = useState<TaskHistoryItem[]>([]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newTask, setNewTask] = useState({
    name: '',
    task_type: 'update_product_prices',
    schedule: '1d',
    enabled: true,
    parameters: {}
  });
  
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('scheduled_tasks')
        .select('*')
        .order('next_run');
        
      if (error) throw error;
      setTasks(data || []);
    } catch (err) {
      console.error('Error fetching tasks:', err);
      toast.error('Failed to load scheduled tasks');
    } finally {
      setLoading(false);
    }
  };
  
  const fetchTaskHistory = async (taskId: string) => {
    try {
      const { data, error } = await supabase
        .from('task_history')
        .select('*')
        .eq('task_id', taskId)
        .order('started_at', { ascending: false })
        .limit(5);
        
      if (error) throw error;
      setTaskHistory(data || []);
    } catch (err) {
      console.error('Error fetching task history:', err);
      toast.error('Failed to load task history');
    }
  };
  
  useEffect(() => {
    fetchTasks();
  }, []);
  
  const runTask = async (task: Task) => {
    try {
      setIsRunningTask(true);
      setSelectedTask(task);
      
      const { data, error } = await supabase.functions.invoke(
        'run-scheduled-tasks',
        {
          body: {
            taskId: task.id
          }
        }
      );
      
      if (error) throw error;
      
      toast.success(`Task "${task.name}" executed successfully`);
      fetchTasks();
      fetchTaskHistory(task.id);
    } catch (err) {
      console.error('Error running task:', err);
      toast.error(`Failed to run task: ${err.message}`);
    } finally {
      setIsRunningTask(false);
    }
  };
  
  const toggleTaskEnabled = async (task: Task) => {
    try {
      const { error } = await supabase
        .from('scheduled_tasks')
        .update({ enabled: !task.enabled })
        .eq('id', task.id);
        
      if (error) throw error;
      
      fetchTasks();
      toast.success(`Task "${task.name}" ${!task.enabled ? 'enabled' : 'disabled'}`);
    } catch (err) {
      console.error('Error toggling task:', err);
      toast.error('Failed to update task');
    }
  };
  
  const handleAddTask = async () => {
    try {
      // Calculate next run time based on schedule
      const now = new Date();
      const scheduleValue = parseInt(newTask.schedule.slice(0, -1));
      const scheduleUnit = newTask.schedule.slice(-1);
      
      let nextRun = new Date();
      
      switch (scheduleUnit) {
        case 'm': // minutes
          nextRun = new Date(now.getTime() + scheduleValue * 60000);
          break;
        case 'h': // hours
          nextRun = new Date(now.getTime() + scheduleValue * 3600000);
          break;
        case 'd': // days
          nextRun = new Date(now.getTime() + scheduleValue * 86400000);
          break;
      }
      
      const { error } = await supabase
        .from('scheduled_tasks')
        .insert({
          name: newTask.name,
          task_type: newTask.task_type,
          schedule: newTask.schedule,
          enabled: newTask.enabled,
          parameters: newTask.parameters,
          next_run: nextRun.toISOString()
        });
        
      if (error) throw error;
      
      toast.success('New task added successfully');
      setShowAddDialog(false);
      setNewTask({
        name: '',
        task_type: 'update_product_prices',
        schedule: '1d',
        enabled: true,
        parameters: {}
      });
      fetchTasks();
    } catch (err) {
      console.error('Error adding task:', err);
      toast.error(`Failed to add task: ${err.message}`);
    }
  };
  
  const formatNextRun = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = date.getTime() - now.getTime();
    const diffMins = Math.round(diffMs / 60000);
    
    if (diffMins < 0) {
      return 'Overdue';
    } else if (diffMins < 60) {
      return `In ${diffMins} minute${diffMins !== 1 ? 's' : ''}`;
    } else if (diffMins < 1440) {
      const hours = Math.floor(diffMins / 60);
      return `In ${hours} hour${hours !== 1 ? 's' : ''}`;
    } else {
      const days = Math.floor(diffMins / 1440);
      return `In ${days} day${days !== 1 ? 's' : ''}`;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Scheduled Tasks</h2>
        <Button onClick={() => setShowAddDialog(true)}>Add New Task</Button>
      </div>
      
      {loading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-zwm-primary" />
        </div>
      ) : tasks.length === 0 ? (
        <Card className="text-center py-8">
          <CardContent>
            <p className="text-gray-500">No scheduled tasks found</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {tasks.map((task) => (
            <Card key={task.id} className={task.enabled ? '' : 'opacity-70'}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{task.name}</CardTitle>
                    <CardDescription>Type: {task.task_type}</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Label htmlFor={`task-${task.id}`} className="text-xs text-gray-500">
                      {task.enabled ? 'Enabled' : 'Disabled'}
                    </Label>
                    <Switch
                      id={`task-${task.id}`}
                      checked={task.enabled}
                      onCheckedChange={() => toggleTaskEnabled(task)}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Schedule:</span>
                    <span>{task.schedule}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Next run:</span>
                    <span>{formatNextRun(task.next_run)}</span>
                  </div>
                  {task.last_run && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Last run:</span>
                      <span>{new Date(task.last_run).toLocaleString()}</span>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" onClick={() => fetchTaskHistory(task.id)}>
                      History
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Task History: {task.name}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 max-h-[400px] overflow-y-auto">
                      {taskHistory.length === 0 ? (
                        <p className="text-center text-gray-500 py-4">No history available</p>
                      ) : (
                        taskHistory.map((item) => (
                          <div key={item.id} className="border rounded-md p-4">
                            <div className="flex justify-between mb-2">
                              <span className="font-medium">Status: 
                                <span className={`ml-1 ${
                                  item.status === 'completed' ? 'text-green-600' : 
                                  item.status === 'failed' ? 'text-red-600' : 
                                  'text-blue-600'
                                }`}>
                                  {item.status}
                                </span>
                              </span>
                              <span className="text-sm text-gray-500">
                                {new Date(item.started_at).toLocaleString()}
                              </span>
                            </div>
                            {item.result && (
                              <pre className="text-xs bg-gray-50 p-2 rounded overflow-x-auto">
                                {item.result}
                              </pre>
                            )}
                          </div>
                        ))
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
                <Button 
                  size="sm"
                  onClick={() => runTask(task)}
                  disabled={isRunningTask && selectedTask?.id === task.id}
                >
                  {isRunningTask && selectedTask?.id === task.id ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Running...
                    </>
                  ) : (
                    <>
                      <Play className="mr-1 h-4 w-4" />
                      Run Now
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
      
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Scheduled Task</DialogTitle>
            <DialogDescription>
              Create a new automated task that will run on a schedule.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="task-name">Task Name</Label>
              <Input
                id="task-name"
                value={newTask.name}
                onChange={(e) => setNewTask({...newTask, name: e.target.value})}
                placeholder="Daily Price Update"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="task-type">Task Type</Label>
              <Select 
                value={newTask.task_type}
                onValueChange={(value) => setNewTask({...newTask, task_type: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select task type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="update_product_prices">Update Product Prices</SelectItem>
                  <SelectItem value="notify_expiring_items">Notify Expiring Items</SelectItem>
                  <SelectItem value="generate_reports">Generate Reports</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="schedule">Schedule</Label>
              <Select 
                value={newTask.schedule}
                onValueChange={(value) => setNewTask({...newTask, schedule: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select schedule" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30m">Every 30 minutes</SelectItem>
                  <SelectItem value="1h">Every hour</SelectItem>
                  <SelectItem value="6h">Every 6 hours</SelectItem>
                  <SelectItem value="12h">Every 12 hours</SelectItem>
                  <SelectItem value="1d">Daily</SelectItem>
                  <SelectItem value="7d">Weekly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="task-enabled"
                checked={newTask.enabled}
                onCheckedChange={(checked) => setNewTask({...newTask, enabled: checked})}
              />
              <Label htmlFor="task-enabled">Task Enabled</Label>
            </div>
          </div>
          
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleAddTask} disabled={!newTask.name}>
              Add Task
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TaskScheduler;
