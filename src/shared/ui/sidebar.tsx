'use client'

import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar'
import { Badge } from '@/shared/ui/badge'
import { Separator } from '@/shared/ui/separator'
import { 
  LayoutDashboard,
  Settings,
  Users,
  BarChart3,
  Mail,
  Calendar,
  FileText,
  HelpCircle,
  LogOut,
  Menu,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { createContext, useContext, useState, ReactNode } from 'react'

interface SidebarContextType {
  isCollapsed: boolean
  setIsCollapsed: (collapsed: boolean) => void
  isMobileOpen: boolean
  setIsMobileOpen: (open: boolean) => void
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export function useSidebar() {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider')
  }
  return context
}

interface SidebarProviderProps {
  children: ReactNode
}

export function SidebarProvider({ children }: SidebarProviderProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  return (
    <SidebarContext.Provider 
      value={{ 
        isCollapsed, 
        setIsCollapsed, 
        isMobileOpen, 
        setIsMobileOpen 
      }}
    >
      {children}
    </SidebarContext.Provider>
  )
}

const navigation = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    badge: null
  },
  {
    name: 'Analytics',
    href: '/dashboard/analytics',
    icon: BarChart3,
    badge: null
  },
  {
    name: 'Users',
    href: '/dashboard/users',
    icon: Users,
    badge: '24'
  },
  {
    name: 'Messages',
    href: '/dashboard/messages',
    icon: Mail,
    badge: '3'
  },
  {
    name: 'Calendar',
    href: '/dashboard/calendar',
    icon: Calendar,
    badge: null
  },
  {
    name: 'Documents',
    href: '/dashboard/documents',
    icon: FileText,
    badge: null
  }
]

const bottomNavigation = [
  {
    name: 'Settings',
    href: '/dashboard/settings',
    icon: Settings
  },
  {
    name: 'Help',
    href: '/dashboard/help',
    icon: HelpCircle
  }
]

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()
  const { isCollapsed, setIsCollapsed, isMobileOpen, setIsMobileOpen } = useSidebar()

  return (
    <>
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex flex-col bg-background border-r transition-all duration-300 lg:relative lg:translate-x-0',
          isCollapsed ? 'w-16' : 'w-64',
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
          className
        )}
      >
        {/* Header */}
        <div className="flex h-16 items-center justify-between px-4">
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">A</span>
              </div>
              <span className="font-semibold">Admin Panel</span>
            </div>
          )}
          
          <div className="flex items-center space-x-1">
            {/* Desktop collapse button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden lg:flex h-8 w-8"
            >
              {isCollapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </Button>
            
            {/* Mobile close button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileOpen(false)}
              className="lg:hidden h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Separator />

        {/* User Profile */}
        <div className="p-4">
          <div className={cn(
            'flex items-center space-x-3',
            isCollapsed && 'justify-center'
          )}>
            <Avatar className="h-8 w-8">
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">John Doe</p>
                <p className="text-xs text-muted-foreground truncate">john@example.com</p>
              </div>
            )}
          </div>
        </div>

        <Separator />

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-2">
          {navigation.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
                  isCollapsed && 'justify-center px-2'
                )}
              >
                <Icon className={cn('h-4 w-4', !isCollapsed && 'mr-3')} />
                {!isCollapsed && (
                  <>
                    <span className="flex-1">{item.name}</span>
                    {item.badge && (
                      <Badge variant="secondary" className="ml-auto text-xs">
                        {item.badge}
                      </Badge>
                    )}
                  </>
                )}
              </Link>
            )
          })}
        </nav>

        <Separator />

        {/* Bottom Navigation */}
        <div className="p-2 space-y-1">
          {bottomNavigation.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
                  isCollapsed && 'justify-center px-2'
                )}
              >
                <Icon className={cn('h-4 w-4', !isCollapsed && 'mr-3')} />
                {!isCollapsed && <span>{item.name}</span>}
              </Link>
            )
          })}
          
          <Button
            variant="ghost"
            className={cn(
              'w-full justify-start text-muted-foreground hover:bg-accent hover:text-accent-foreground',
              isCollapsed && 'justify-center px-2'
            )}
          >
            <LogOut className={cn('h-4 w-4', !isCollapsed && 'mr-3')} />
            {!isCollapsed && <span>Logout</span>}
          </Button>
        </div>
      </div>
    </>
  )
}

// Mobile menu button component
export function SidebarTrigger() {
  const { setIsMobileOpen } = useSidebar()
  
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setIsMobileOpen(true)}
      className="lg:hidden"
    >
      <Menu className="h-5 w-5" />
    </Button>
  )
}