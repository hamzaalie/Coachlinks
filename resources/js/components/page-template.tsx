import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { ReactNode } from 'react';
import { FloatingChatGpt } from '@/components/FloatingChatGpt';

export interface PageAction {
  label: string;
  icon?: ReactNode;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  onClick?: () => void;
}

export interface PageTemplateProps {
  title: string;
  description?: string;
  url: string;
  actions?: PageAction[];
  customAction?: ReactNode;
  children: ReactNode;
  noPadding?: boolean;
  breadcrumbs?: BreadcrumbItem[];
}

export function PageTemplate({ 
  title,
  description, 
  url, 
  actions, 
  customAction,
  children, 
  noPadding = false,
  breadcrumbs
}: PageTemplateProps) {
  // Default breadcrumbs if none provided
  const pageBreadcrumbs: BreadcrumbItem[] = breadcrumbs || [
    {
      title,
      href: url,
    },
  ];

  return (
    <AppLayout breadcrumbs={pageBreadcrumbs}>
      <Head title={title} />
      
      <div className="flex h-full flex-1 flex-col gap-4 p-4">
        {/* Header with action buttons */}
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">{title}</h1>
          {(actions || customAction) && (
            <div className="flex items-center gap-2">
              {customAction}
              {actions?.map((action, index) => (
                <Button 
                  key={index}
                  variant={action.variant || 'outline'} 
                  size="sm"
                  onClick={action.onClick}
                  className="cursor-pointer"
                >
                  {action.icon && <span className="mr-1">{action.icon}</span>}
                  {action.label}
                </Button>
              ))}
            </div>
          )}
        </div>
        
        {/* Content */}
        <div className={noPadding ? "" : "rounded-xl border p-6"}>
          {children}
        </div>
      </div>
      <FloatingChatGpt />
    </AppLayout>
  );
}