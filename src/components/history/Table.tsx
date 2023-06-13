import { history } from "@/utils/data";
import { BsThreeDots } from "react-icons/bs";

const Table = () => {
  return (
    <div className="flex flex-col mt-8">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full text-left text-sm font-light">
              <thead className="border-b font-medium border-gray/10">
                <tr>
                  <th scope="col" className="px-6 py-4 text-dark">
                    Order Id
                  </th>
                  <th scope="col" className="px-6 py-4 text-dark">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-4 text-dark">
                    Table
                  </th>
                  <th scope="col" className="px-6 py-4 text-dark">
                    Amount
                  </th>
                  <th scope="col" className="px-6 py-4 text-dark">
                    Payment type
                  </th>
                  <th scope="col" className="px-6 py-4 text-dark">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {history.map((el) => (
                  <tr key={el.orderId} className="border-b border-gray/10">
                    <td className="whitespace-nowrap px-6 py-4 font-medium text-dark/70">
                      #{el.orderId}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 font-medium text-dark/70">
                      {el.date}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 font-medium text-dark/70">
                      {el.table}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 font-medium text-dark/70">
                      ${el.price}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 font-medium text-dark/70">
                      <p
                        className={`px-4 py-1 rounded-full text-white inline-block ${
                          el.paymentType === "Cash"
                            ? "bg-[#61BE93]"
                            : el.paymentType === "Debut"
                            ? "bg-[#5491CF]"
                            : "bg-[#52C1C9]"
                        }`}
                      >
                        {el.paymentType}
                      </p>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 font-medium text-dark/70">
                      <BsThreeDots size={20} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
