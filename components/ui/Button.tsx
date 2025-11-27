import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'default' | 'outline' | 'ghost' | 'gradient';
    size?: 'default' | 'sm' | 'lg';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'default', size = 'default', ...props }, ref) => {
        const variants = {
            default: "bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm border border-white/20",
            outline: "border-2 border-white/30 bg-transparent hover:bg-white/10 text-white",
            ghost: "hover:bg-white/10 text-white",
            gradient: "bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 text-white shadow-lg",
        }
        const sizes = {
            default: "h-11 px-6 py-2",
            sm: "h-9 rounded-md px-4 text-sm",
            lg: "h-12 rounded-lg px-8 text-lg",
        }
        return (
            <button
                className={cn(
                    "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 disabled:pointer-events-none disabled:opacity-50 transform hover:scale-[1.02]",
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
