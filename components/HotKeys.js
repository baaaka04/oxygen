

export default function HotKeys({ freqTrs, onPressHotkey }) {

    return (
        <div className="flex flex-wrap justify-between gap-2">
            {freqTrs.map(item => {
                return (
                    <button
                        className="w-24 text-indigo-200 bg-indigo-900 rounded grow h-14"
                        key={item.join('')}
                        onClick={(e) => onPressHotkey(item, e)}
                    >{item[1]}</button>
                )
            })}
        </div>
    )
}