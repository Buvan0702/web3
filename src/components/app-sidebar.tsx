"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarInset,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, BookText, HeartPulse, Trophy, BotMessageSquare } from 'lucide-react';
import { useAppContext } from '@/context/app-context';

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/journal', icon: BookText, label: 'Journal' },
  { href: '/mood-tracker', icon: HeartPulse, label: 'Mood Tracker' },
  { href: '/rewards', icon: Trophy, label: 'Rewards' },
];

export function AppSidebar({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { wellnessTokens } = useAppContext();

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2 p-2">
            <Button variant="ghost" size="icon" className="shrink-0" asChild>
              <Link href="/dashboard">
                <BotMessageSquare className="size-6 text-primary-foreground fill-primary" />
              </Link>
            </Button>
            <div className="flex flex-col">
              <h2 className="text-lg font-semibold tracking-tight">NeuroWeb3</h2>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href}
                  tooltip={item.label}
                >
                  <Link href={item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <div className="flex flex-col gap-2 p-4 rounded-lg m-2 bg-primary/20">
            <p className="text-sm font-medium text-primary-foreground">Wellness Tokens</p>
            <p className="text-3xl font-bold text-primary-foreground">{wellnessTokens}</p>
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-12 items-center justify-between border-b bg-background/50 backdrop-blur-sm p-2 sm:p-4">
            <SidebarTrigger />
            {/* Can add user profile / other header items here */}
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
