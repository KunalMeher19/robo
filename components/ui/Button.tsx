import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'default' | 'outline' | 'ghost' | 'gradient';
    size?: 'default' | 'sm' | 'lg';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'default', size = 'default', ...props }, ref) => {
        const variants = {
            default: "bg-white border border-slate-200 text-slate-900 hover:bg-slate-50 hover:border-slate-300 shadow-sm",
            outline: "border-2 border-slate-300 bg-transparent hover:bg-slate-50 text-slate-900",
            ghost: "hover:bg-slate-100 text-slate-900",
            gradient: "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white shadow-lg",
        }
        const sizes = {
            default: "h-11 px-6 py-2",
            sm: "h-9 rounded-md px-4 text-sm",
            lg: "h-12 rounded-lg px-8 text-lg",
        }
        return (
            <button
                className={cn(
                    "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-200 disabled:pointer-events-none disabled:opacity-50 transform hover:scale-[1.01]",
                    variants[variant],
                    sizes[size],
                    className
                )}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button }
