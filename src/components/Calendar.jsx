import Header from "./Header";

const Calendar = () => {
  return (
    <div className="w-screen min-h-screen viewport">
      <Header
        showNavBack={true}
        title="Renewly"
        isAppTitle={true}
        showIcons={true}
      />
    </div>
  );
};

export default Calendar;
