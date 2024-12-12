import EventsContent from "@/components/MainPage/PageContent/EventsContent";
import { Suspense } from "react";

const EventPage = () => {
  return (
    <Suspense>
      <EventsContent />
    </Suspense>
  );
};

export default EventPage;
