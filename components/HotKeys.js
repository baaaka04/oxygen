

export default function HotKeys({ freqTrs, onPressHotkey }) {

    return (
        <div className="flex flex-wrap justify-between gap-2">
            {freqTrs.map(item => {
                return (
                    <button
                        className="w-24 text-blue-900 text-ellipsis overflow-hidden rounded dark:text-indigo-200 dark:bg-blue-900 bg-blue-400/50 grow h-14"
                        key={item.join('')}
                        onClick={(e) => onPressHotkey(item, e)}
                    >{item[1]}</button>
                )
            })}
        </div>
    )
}