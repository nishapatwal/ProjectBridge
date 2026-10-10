import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Terminal, FileQuestion, ArrowLeft } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-[#080b11] flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      <div className="w-full max-w-md relative z-10">
        <div className="flex flex-col items-center mb-6">
          <Link href="/" className="flex items-center space-x-2.5 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600/20 border border-indigo-500/30 text-indigo-400">
              <Terminal className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              Project<span className="text-indigo-400">Bridge</span>
            </span>
          </Link>
        </div>

        <Card className="border-slate-800 bg-slate-900/90 shadow-2xl">
          <CardHeader className="text-center pb-4 border-b border-slate-800">
            <div className="mx-auto w-12 h-12 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-3">
              <FileQuestion className="h-6 w-6" />
            </div>
            <CardTitle className="text-xl text-white">Page Not Found</CardTitle>
            <p className="text-xs text-slate-400 mt-1">
              Error 404 — The requested route does not exist
            </p>
          </CardHeader>

          <CardContent className="pt-6 text-center space-y-3">
            <p className="text-sm text-slate-300 leading-relaxed">
              The page you are trying to reach could not be located. It may have been moved, renamed, or is restricted to another user role.
            </p>
          </CardContent>

          <CardFooter className="pt-2 pb-6 border-t border-slate-800">
            <Link href="/" className="w-full">
              <Button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Return to ProjectBridge Home
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
