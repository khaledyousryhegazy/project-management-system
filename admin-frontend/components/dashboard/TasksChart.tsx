"use client"

import * as React from "react"
import { Label, Pie, PieChart } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
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
    { project: "in-progress", value: 40, fill: "#a5c1d0" },
    { project: "completed", value: 10, fill: "#1e638a" },
    { project: "canceled", value: 6, fill: "#ff0040" },
]

const chartConfig = {
    // nothing to do here, just fill
} satisfies ChartConfig

export function TasksChart() {
    const totalTasks = 56 // This should be fetched from the API

    return (
        <Card className="flex flex-col w-full">
            <CardHeader className="items-center pb-0">
                <CardTitle>Tasks Analyst</CardTitle>
                <CardDescription>Showing Tasks Status</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={ chartConfig }
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={ false }
                            content={ <ChartTooltipContent hideLabel /> }
                        />
                        <Pie
                            data={ chartData }
                            dataKey="value"
                            nameKey="project"
                            innerRadius={ 60 }
                            strokeWidth={ 5 }
                        >
                            <Label
                                content={ ( { viewBox } ) => {
                                    if ( viewBox && "cx" in viewBox && "cy" in viewBox ) {
                                        return (
                                            <text
                                                x={ viewBox.cx }
                                                y={ viewBox.cy }
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={ viewBox.cx }
                                                    y={ viewBox.cy }
                                                    className="fill-foreground text-3xl font-bold"
                                                >
                                                    { totalTasks.toLocaleString() }
                                                </tspan>
                                                <tspan
                                                    x={ viewBox.cx }
                                                    y={ ( viewBox.cy || 0 ) + 24 }
                                                    className="fill-muted-foreground"
                                                >
                                                    Projects
                                                </tspan>
                                            </text>
                                        )
                                    }
                                } }
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}