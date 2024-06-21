import { range } from "../../utils";

function TableRowSkeleton() {
  return (
    <tr>
      <td>
        <div className="animate-pulse">
          <div className="h-[38px] w-[50px] bg-gray-200 rounded"></div>
        </div>
      </td>
      <td>
        <div className="animate-pulse">
          <div className="h-2.5  w-2/3 bg-gray-200 rounded-xl my-4"></div>
        </div>
      </td>
      <td>
        <div className="animate-pulse">
          <div className="h-2.5 w-2/3 bg-gray-200 rounded-xl my-4"></div>
        </div>
      </td>
      <td>
        <div className="animate-pulse">
          <div className="h-2.5  w-2/3 bg-gray-200 rounded-xl my-4"></div>
        </div>
      </td>
      <td className="hidden xl:table-cell">
        <div className="animate-pulse">
          <div className="h-2.5  w-2/3 bg-gray-200 rounded-xl my-4"></div>
        </div>
      </td>
    </tr>
  );
}

function TableBodySkeleton() {
  return (
    <tbody>
      {range(0, 10).map((index) => (
        <TableRowSkeleton key={index} />
      ))}
    </tbody>
  );
}

export default TableBodySkeleton;
