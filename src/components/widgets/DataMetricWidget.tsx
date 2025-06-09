import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react'; // Type for icon component

interface DataMetricWidgetProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: LucideIcon;
  trend?: 'up' | 'down' | 'neutral'; // Optional trend indicator
  trendValue?: string; // e.g., "+5.2%"
  className?: string;
  onWidgetClick?: () => void; // Optional click handler
}

const DataMetricWidget: React.FC<DataMetricWidgetProps> = ({
  title,
  value,
  description,
  icon: Icon,
  trend,
  trendValue,
  className,
  onWidgetClick,
}) => {
  console.log("Rendering DataMetricWidget:", title);

  return (
    <Card className={cn("w-full", className, onWidgetClick && "cursor-pointer hover:shadow-md transition-shadow")} onClick={onWidgetClick}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
            <p className="text-xs text-muted-foreground pt-1">{description}</p>
        )}
        {trend && trendValue && (
          <p className={cn(
            "text-xs text-muted-foreground pt-1",
            trend === 'up' && "text-green-600",
            trend === 'down' && "text-red-600"
          )}>
            {trendValue}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default DataMetricWidget;