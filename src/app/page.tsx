import { LoginButton } from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-6 bg-sky-900">
      <div className="space-y-6 text-center flex flex-col">
        <h1 className="text-6xl font-semi-bold text-white drop-shadow-xl">
          🔐 Auth
        </h1>
        <p className="text-lg text-white">
          A simple Auth application service
        </p>
        <LoginButton>
          <Button variant="secondary" size="lg">
            Sign in
          </Button>
        </LoginButton>
      </div>
    </main>
  );
}
