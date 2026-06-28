
const FoodCard = ({ food }: any) => {
    return (
        <div className="bg-white rounded-xl shadow p-4">

            <img
                src={food.image}
                className="h-40 w-full object-cover rounded-lg"
            />

            <h3 className="font-semibold mt-3">
                {food.name}
            </h3>

            <div className="flex justify-between items-center mt-2">

                <span className="font-bold">
                    ₦{food.price}
                </span>

                <button className="bg-green-500 text-white px-3 py-1 rounded">
                    Add
                </button>

            </div>

        </div>
    )
}

export default FoodCard