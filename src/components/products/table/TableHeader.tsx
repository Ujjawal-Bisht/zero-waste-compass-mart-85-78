
import React from 'react';
import TableColumnHeader from './TableColumnHeader';

interface TableHeaderProps {
  sortField: string | null;
  sortDirection: 'asc' | 'desc';
  handleSortChange: (field: string) => void;
  animateSort?: boolean;
}

const TableHeader: React.FC<TableHeaderProps> = ({ 
  sortField, 
  sortDirection, 
  handleSortChange,
  animateSort = false
}) => {
  return (
    <thead className="bg-gray-50">
      <tr>
        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Image
        </th>
        <TableColumnHeader
          label="Name"
          field="name"
          sortField={sortField}
          sortDirection={sortDirection}
          handleSortChange={handleSortChange}
          animateSort={animateSort}
        />
        <TableColumnHeader
          label="Price"
          field="price"
          sortField={sortField}
          sortDirection={sortDirection}
          handleSortChange={handleSortChange}
          animateSort={animateSort}
        />
        <TableColumnHeader
          label="Category"
          field="category"
          sortField={sortField}
          sortDirection={sortDirection}
          handleSortChange={handleSortChange}
          animateSort={animateSort}
        />
        <TableColumnHeader
          label="Status"
          field="status"
          sortField={sortField}
          sortDirection={sortDirection}
          handleSortChange={handleSortChange}
          animateSort={animateSort}
        />
        <TableColumnHeader
          label="Created"
          field="createdAt"
          sortField={sortField}
          sortDirection={sortDirection}
          handleSortChange={handleSortChange}
          animateSort={animateSort}
        />
        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
          Actions
        </th>
      </tr>
    </thead>
  );
};

export default TableHeader;
