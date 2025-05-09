"use client"

import { usePersistAuth } from "@/hooks/usePersistAuth"

export default function PersistAuthWrapper() {
    usePersistAuth()
    return null
}
