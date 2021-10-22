interface Loader {
    color?: string;
    size?: number;
    className?: string;
    style?: any;
}

export default function Loader({ color, size, className, style }: Loader) {
    return (
        <span className="animate-fadeIn">
            <div
                style={style}
                className={`${
                    size ? `w-${size} h-${size}` : "w-6 h-6"
                } border-2 border-solid rounded-full animate-spin ${
                    color ? color : "dark:border-white border-black"
                } ${className ? className : ""}`}
            ></div>
        </span>
    );
}
