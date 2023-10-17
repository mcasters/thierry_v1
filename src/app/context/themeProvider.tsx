'use client'
import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useContext,
    useState,
} from 'react'

interface ThemeContext {
    backgroundColor: string
    setBackgroundColor: Dispatch<SetStateAction<string>>
}

const ThemeContext = createContext<ThemeContext>({} as ThemeContext)

interface Props {
    children: ReactNode
}

export function ThemeProvider({ children }: Props) {
    const [backgroundColor, setBackgroundColor] = useState<string>('#f8f8f8')

    return (
        <ThemeContext.Provider value={{ backgroundColor, setBackgroundColor }}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    const theme = useContext(ThemeContext)
    return theme
}
