import { Icons } from "@/components/icons";
import { Button } from "../ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { signInWithPopup } from "firebase/auth";
import {
  googleProvider,
  twitterProvider,
  facebookProvider,
  githubProvider,
} from "@/lib/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useUserStore } from "@/store/userStore";

const FormSchema = z.object({
  email: z.string().email({
    message: "Valid email address is required. ",
  }),
  password: z.string().nonempty({
    message: "Password is required.",
  }),
});
export default function Login({ className }) {
  const { fetchUserInfo } = useUserStore();
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(FormSchema),
  });

  async function socialLogin(provider) {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result);
      const user = result.user;
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);
      if (!userDoc.exists()) {
        await setDoc(doc(db, "users", user.uid), {
          username: user.displayName,
          email: user.email,
          avatar: user.photoURL,
          id: user.uid,
          blocked: [],
        });
        await setDoc(doc(db, "userchats", user.uid), {
          chats: [],
        });
      }
      toast({
        title: "Login Successful!",
        description: "Logged In successfully!",
        status: "success",
      });
      console.log(user, "before fetch");
      fetchUserInfo(user.uid);
    } catch (error) {
      console.log(error);
      toast({
        title: "An error occurred",
        description: "Unable to create account",
        status: "error",
      });
    }
  }

  async function onSubmit(data) {
    console.log(data);
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);

      toast({
        title: "Login Successfull!",
        description: "Logged In successfully!",
        status: "success",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "An error occurred",
        description: "Unable to Login to your Account",
        status: "error",
      });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`space-y-3 text-black bg-white p-4 rounded-md ${className}`}
      >
        <h2 className="text-xl font-bold">Login to your Account</h2>
        <p> Enter your Email and password to Login</p>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="johnwick07@gmail.com" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="*********" type="password" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Login
        </Button>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => socialLogin(twitterProvider)}
          >
            <Icons.twitter className="mr-2 h-4 w-4" />
            Twitter
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => socialLogin(googleProvider)}
          >
            <Icons.google className="mr-2 h-4 w-4" />
            Google
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => socialLogin(facebookProvider)}
          >
            <Icons.facebook className="mr-2 h-6 w-6" />
            Facebook
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => socialLogin(githubProvider)}
          >
            <Icons.gitHub className="mr-2 h-4 w-4" />
            Github
          </Button>
        </div>
      </form>
    </Form>
  );
}
