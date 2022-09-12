import A from "./A";
import PieChartSVG from '../public/icons/pie-chart.svg';
import SettingSVG from '../public/icons/settings.svg';
import HomeSVG from '../public/icons/sheet.svg';
import { useEffect } from "react";

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

    useEffect(() => {
        const userTheme = localStorage.getItem("theme")
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches // true if system theme dark

        if (userTheme === 'dark' || (!userTheme && systemTheme)) {
            document.documentElement.classList.add('dark', 'bg-slate-800', 'text-indigo-200')
        }
    }, [])

    return (
        <>
            <div className="flex flex-col items-center h-full">
                {children}
            </div>
            <div className="fixed bottom-0 flex items-center justify-around w-full h-16 dark:bg-slate-700 bg-slate-300">
                {buttons.map(btn => {
                    return (
                        <A key={btn.text} href={btn.href} activeClassName="active">
                            <div className="flex flex-col items-center m-auto text-xs text-slate-500/50 grow">
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
        </>
    )
}