

export default function HotKeys({ freqTrs, onPressHotkey }) {

    return (
        <div className="flex flex-wrap justify-between gap-2">
            {freqTrs.map(item => {
                return (
                    <button
                        className="w-24 truncate dark:text-indigo-200 dark:bg-indigo-900 bg-blue-400/50 text-blue-900 rounded grow h-14"
                        key={item.join('')}
                        onClick={(e) => onPressHotkey(item, e)}
                    >{item[1]}</button>
                )
            })}
        </div>
    )
}