"use client"

import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
const chartData = [
  { month: "January", achieve: 186, target: 120 },
  { month: "February", achieve: 305, target: 200 },
  { month: "March", achieve: 237, target: 120 },
  { month: "April", achieve: 73, target: 60 },
  { month: "May", achieve: 209, target: 130 },
  { month: "June", achieve: 214, target: 140 },
  { month: "July", achieve: 125, target: 80 },
  { month: "August", achieve: 515, target: 200 },
  { month: "September", achieve: 123, target: 120 },
  { month: "October", achieve: 56, target: 80 },
  { month: "November", achieve: 55, target: 75 },
  { month: "December", achieve: 314, target: 140 },
]

const chartConfig = {
  // nothing to show just fill
} satisfies ChartConfig

export function AchieveTarget() {
  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>Target & Achieve</CardTitle>
      </CardHeader>
      <CardContent className="h-[250px]">
        <ChartContainer className="h-full w-full" config={ chartConfig }>
          <LineChart
            accessibilityLayer
            data={ chartData }

          >
            <CartesianGrid vertical={ false } />
            <XAxis
              dataKey="month"
              tickLine={ false }
              axisLine={ false }
              tickMargin={ 8 }
              tickFormatter={ ( value ) => value.slice( 0, 3 ) }
            />
            <ChartTooltip cursor={ false } content={ <ChartTooltipContent /> } />
            <Line
              dataKey="target"
              type="monotone"
              stroke="#78a1b9"
              strokeWidth={ 2 }
              dot={ false }
            />
            <Line
              dataKey="achieve"
              type="monotone"
              stroke="#1e638a"
              strokeWidth={ 2 }
              dot={ false }
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
