

export default function HotKeys({ freqTrs, onPressHotkey }) {

    return (
        <div className="flex flex-wrap justify-center w-11/12 m-auto">
            {freqTrs.map(item => {
                return (
                    <button
                        className="w-24 m-1 text-indigo-200 bg-indigo-900 rounded h-14 hover:bg-indigo-700"
                        key={item.join('')}
                        onClick={(e) => onPressHotkey(item, e)}
                    >{item[1]}</button>
                )
            })}
        </div>
    )
}