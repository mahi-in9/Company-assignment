const Table = ({
    headers,
    children
}) => {
    return (
        <table className="w-full border">

            <thead>

                <tr>
                    {headers.map(
                        (header) => (
                            <th
                                key={header}
                                className="border p-2 bg-gray-100"
                            >
                                {header}
                            </th>
                        )
                    )}
                </tr>

            </thead>

            <tbody>
                {children}
            </tbody>

        </table>
    );
};

export default Table;