import './App.css';
import { Scheduler } from "@aldabil/react-scheduler";

function App() {
  return (
    <div className="App">
      <Scheduler
        view="month"
        events={[
          {
            event_id: 1,
            title: "Event 1",
            start: new Date("2023/3/15 09:30"),
            end: new Date("2023/3/15 10:30"),
          },
        ]}
      />
    </div>
  );
}

export default App;
