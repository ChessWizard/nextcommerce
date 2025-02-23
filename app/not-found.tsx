"use client"

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-gray-100 dark:bg-gray-900 text-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center"
      >
        <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white">404 - Page Not Found</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
            Sorry, the page you are looking for does not exist.
        </p>
        <Button
          onClick={() => router.push("/")}
          className="mt-6 px-6 py-2 text-lg"
        >
          Back to Homepage
        </Button>
      </motion.div>
    </div>
  );
}