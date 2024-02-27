'use client'
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { CircularProgress, Text } from "@chakra-ui/react";
import UsersTable from "@/components/Dashboard/Customers/UsersTable";

export default function viewStorage({ params }: { params: { storage_id: string } }) {

    const supabase = createClient()


    return (
        <>
            <Text fontSize={`2xl`}>Просмотр склада (ID: {params.storage_id})</Text>
        </>
    )
}