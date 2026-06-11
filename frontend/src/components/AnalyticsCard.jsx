const AnalyticsCard = ({
    title,
    value
}) => {
    return (
        <div className="bg-white p-5 rounded shadow">

            <h3 className="text-gray-500">
                {title}
            </h3>

            <h2 className="text-3xl font-bold mt-2">
                {value}
            </h2>

        </div>
    );
};

export default AnalyticsCard;