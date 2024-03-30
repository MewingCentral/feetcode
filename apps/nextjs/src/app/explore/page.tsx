import { validateRequest } from "@feprep/auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@feprep/ui/tabs";

import { UserProvider } from "~/utils/user";
import { Nav } from "./nav";
import { QuestionsTab } from "./questions-tab";
import { StudySetsTab } from "./study-sets-tab";

export default async function Explore() {
  const { user } = await validateRequest();

  return (
    <UserProvider user={user}>
      <div className="mx-auto flex h-screen w-full max-w-screen-lg flex-col">
        <Nav />
        <Tabs
          className="flex flex-1 flex-col p-6 lg:min-h-0"
          defaultValue="questions"
        >
          <TabsList className="mb-8 self-start">
            <TabsTrigger value="questions">Questions</TabsTrigger>
            <TabsTrigger value="study">Study Sets</TabsTrigger>
          </TabsList>

          <TabsContent value="questions">
            <QuestionsTab />
          </TabsContent>
          <TabsContent
            className="flex flex-1 flex-col gap-4 md:min-h-0 lg:flex-row"
            value="study"
          >
            <StudySetsTab />
          </TabsContent>
        </Tabs>
      </div>
    </UserProvider>
  );
}
