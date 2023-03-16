'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import Code from "@/components/Code";
import { nodejs, python } from "@/helpers/documantation-code";
import SimpleBar from "simplebar-react";

import 'simplebar-react/dist/simplebar.min.css'

const DocumentationTabs = ({}) => {
  return (
    <Tabs defaultValue="nodejs" className="max-w-2xl w-full">
      <TabsList>
        <TabsTrigger value="nodejs">NodeJS</TabsTrigger>
        <TabsTrigger value="python">Python</TabsTrigger>
      </TabsList>
      <TabsContent value="nodejs">
        <SimpleBar>
          <Code language="typescript" code={nodejs} show animated />
        </SimpleBar>
      </TabsContent>
      <TabsContent value="python">
        <SimpleBar>
          <Code language="python" code={python} show animated />
        </SimpleBar>
      </TabsContent>
    </Tabs>
  );
};

export default DocumentationTabs;
