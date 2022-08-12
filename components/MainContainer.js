import A from "./A";
import PieChartSVG from '../public/icons/pie-chart.svg';
import SettingSVG from '../public/icons/settings.svg';
import HomeSVG from '../public/icons/sheet.svg';

export default function MainContainer({ children }) {

    const buttons = [
        {
            href: '/',
            text: 'Главная',
            icon: <HomeSVG />
        },
        {
            href: '/piechart',
            text: 'Анализ',
            icon: <PieChartSVG />
        },
        {
            href: '/settings',
            text: 'Настройки',
            icon: <SettingSVG />
        },
    ]

    return (
        <div className="">
            <div className="flex flex-col items-center">
                {children}
            </div>
            <div className="fixed bottom-0 flex items-center justify-around w-full h-16 bg-slate-700">
                {buttons.map(btn => {
                    return (
                        <A key={btn.text} href={btn.href} activeClassName="active" className="bg-slate-300">
                            <div className="flex flex-col items-center m-auto text-xs text-slate-500 grow">
                                <div className="flex items-center justify-center transition-colors duration-500 rounded-full w-11 h-11">
                                    <div className="w-8 h-8 icon">
                                        {btn.icon}
                                    </div>
                                </div>
                                {btn.text}
                            </div>
                        </A>
                    )
                }
                )}
            </div>
        </div>
    )
}