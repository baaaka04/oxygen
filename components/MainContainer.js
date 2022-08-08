import A from "./A";

export default function MainContainer({ children }) {
    return (
        <div className="">
            <div className="flex flex-col items-center">
                {children}
            </div>
            <div className="fixed bottom-0 flex items-center justify-around w-full h-16 bg-slate-600">
                <A href={'/'} text={'Home'} />
                <A href={'/login'} text={'Login'} />
                <A href={'/users'} text={'Users'} />
            </div>
        </div>
    )
}