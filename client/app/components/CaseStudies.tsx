import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export function CaseStudies(){
  return (
    <section className="wrapper py-32 px-4">
      <div className="flex flex-col gap-10">
        <div className="text-center">
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
          Case Studies
          </h1>
          <p className="mt-4 text-2xl text-muted-foreground md:text-3xl">
          Read about how product videos improves engagement and conversions.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          <a className="group lg:col-span-2 lg:row-span-2" href="#">
            <Card className="h-full items-start border border-transparent bg-zinc-50 p-12 lg:p-20 hover:cursor-pointer hover:bg-gradient-to-br from-white to-zinc-100">
              <div className="flex flex-col gap-8">
                <Badge className="w-fit">Studies</Badge>
                <div className="flex flex-col gap-6">
                  <p className="text-base lg:text-lg lg:font-medium">
                    Case Study
                  </p>
                  <h3 className="text-xl text-gradient font-medium lg:text-5xl leading-[1.25]">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </h3>
                  <p className="lg:text-lg lg:font-medium">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Repellat cupiditate dicta accusamus quae nesciunt deserunt
                    cum deleniti atque consequuntur quis!
                  </p>
                </div>
                <p className="font-medium group-hover:underline">
                  Continue reading
                </p>
              </div>
            </Card>
          </a>
          <a className="group" href="#">
            <Card className="h-full items-start border border-transparent bg-zinc-50 p-12 hover:cursor-pointer hover:bg-gradient-to-br from-white to-zinc-100">
              <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-6">
                  <p>Case Study</p>
                  <h3 className="text-xl text-gradient font-medium leading-[1.25]">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </h3>
                </div>
                <p className="font-medium group-hover:underline">
                  Continue reading
                </p>
              </div>
            </Card>
          </a>
          <a className="group" href="#">
            <Card className="h-full items-start border border-transparent bg-zinc-50 p-12 hover:cursor-pointer hover:bg-gradient-to-br from-white to-zinc-100">
              <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-6">
                  <p>Case Study</p>
                  <h3 className="text-xl text-gradient font-medium leading-[1.25]">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </h3>
                </div>
                <p className="font-medium group-hover:underline">
                  Continue reading
                </p>
              </div>
            </Card>
          </a>
          <a className="group" href="#">
            <Card className="h-full items-start border border-transparent bg-zinc-50 p-12 hover:cursor-pointer hover:bg-gradient-to-br from-white to-zinc-100">
              <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-6">
                  <p>Case Study</p>
                  <h3 className="text-xl text-gradient font-medium leading-[1.25]">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </h3>
                </div>
                <p className="font-medium group-hover:underline">
                  Continue reading
                </p>
              </div>
            </Card>
          </a>
          <a className="group" href="#">
            <Card className="h-full items-start border border-transparent bg-zinc-50 p-12 hover:cursor-pointer hover:bg-gradient-to-br from-white to-zinc-100">
              <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-6">
                  <p>Case Study</p>
                  <h3 className="text-xl text-gradient font-medium leading-[1.25]">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </h3>
                </div>
                <p className="font-medium group-hover:underline">
                  Continue reading
                </p>
              </div>
            </Card>
          </a>
          <a className="group" href="#">
            <Card className="h-full items-start border border-transparent bg-zinc-50 p-12 hover:cursor-pointer hover:bg-gradient-to-br from-white to-zinc-100">
              <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-6">
                  <p>Case Study</p>
                  <h3 className="text-xl text-gradient font-medium leading-[1.25]">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </h3>
                </div>
                <p className="font-medium group-hover:underline">
                  Continue reading
                </p>
              </div>
            </Card>
          </a>
        </div>
      </div>
    </section>
  );
};
