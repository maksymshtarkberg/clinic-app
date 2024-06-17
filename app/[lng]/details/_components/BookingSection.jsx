"use client";
import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import GlobalApi from "../../_services/GlobalApi";

import { toast } from "sonner";
import moment from "moment";
import { useUser } from "@descope/nextjs-sdk/client";

function BookingSection({ children, business }) {
  const [date, setDate] = useState(new Date());
  const [timeSlot, setTimeSlot] = useState([]);
  const [selectedTime, setSelectedTime] = useState();
  const [bookedSlot, setBookedSlot] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    getTime();
  }, []);

  useEffect(() => {
    date && BusinessBookedSlot();
  }, [date]);

  /**
   * Get Selected Date Business Booked Slot
   */
  const BusinessBookedSlot = async () => {
    try {
      const response = await GlobalApi.BusinessBookedSlot(
        business.id,
        moment(date).format("DD-MMM-yyyy")
      );
      if (response) {
        console.log(response);
        setBookedSlot(response.bookings);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getTime = () => {
    const timeList = [];
    for (let i = 10; i <= 12; i++) {
      timeList.push({
        time: i + ":00",
      });
      timeList.push({
        time: i + ":30",
      });
    }
    for (let i = 13; i <= 20; i++) {
      timeList.push({
        time: i + ":00",
      });
      timeList.push({
        time: i + ":30",
      });
    }

    setTimeSlot(timeList);
  };

  const GetUserBookingHistory = async () => {
    try {
      const resp = await GlobalApi.GetUserBookingHistory(user.email);
      console.log(resp);
      if (resp) {
        return resp.bookings.filter((item) => {
          const formattedDate = moment(item.date, "DD-MMM-YYYY").format(
            "YYYY-MM-DD"
          );
          const itemDateTime = new Date(`${formattedDate}T${item.time}`);
          const currentDateTime = new Date();
          return itemDateTime >= currentDateTime;
        });
      }
      return [];
    } catch (error) {
      console.error("Error fetching booking history:", error);
      return [];
    }
  };

  const saveBooking = async () => {
    try {
      const existingBookings = await GetUserBookingHistory();
      const hasBookingForBusiness = existingBookings.some(
        (booking) => booking.businessList.name === business.name
      );

      if (hasBookingForBusiness) {
        toast("You already have a booking for this service.");
        return;
      }

      const response = await GlobalApi.createNewBooking(
        business.id,
        moment(date).format("DD-MMM-yyyy"),
        selectedTime,
        user.email,
        user.name
      );
      console.log(response);
      if (response) {
        setDate(new Date());
        setSelectedTime("");
        toast("Service Booked successfully!");
      }
    } catch (error) {
      toast("Error while creating booking");
      console.log(error);
    }
  };

  const isSlotBooked = (time) => {
    return bookedSlot.find((item) => item.time == time);
  };

  const isDisabledTime = (time) => {
    const now = new Date();
    const selectedDateTime = moment(
      `${moment(date).format("YYYY-MM-DD")} ${time}`,
      "YYYY-MM-DD HH:mm"
    );
    const threeHoursLater = moment(now).add(3, "hours");

    const isSaturday = moment(date).day() === 6;

    if (isSaturday) {
      return true;
    }

    if (moment(date).isSame(now, "day")) {
      return selectedDateTime.isBefore(threeHoursLater);
    }
    return false;
  };

  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>{children}</SheetTrigger>
        <SheetContent className="overflow-auto">
          <SheetHeader>
            <SheetTitle>Book an Service</SheetTitle>
            <SheetDescription>
              Select Date and Time slot to book an service
            </SheetDescription>

            {/* Date Picker  */}
            <div className="flex flex-col gap-5 items-baseline">
              <h2 className="mt-5 font-bold">Select Date</h2>

              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border "
              />
            </div>
            {/* Time Slot Picker  */}
            <h2 className="my-5 font-bold">Select Time Slot</h2>
            <div className="grid grid-cols-3 gap-3">
              {timeSlot.map((item, index) => (
                <Button
                  key={index}
                  disabled={
                    isSlotBooked(item.time) || isDisabledTime(item.time)
                  }
                  variant="outiline"
                  className={`border rounded-full 
                p-2 px-3 hover:bg-primary
                 hover:text-white
                 ${selectedTime == item.time && "bg-primary text-white"}`}
                  onClick={() => setSelectedTime(item.time)}
                >
                  {item.time}
                </Button>
              ))}
            </div>
          </SheetHeader>
          <SheetFooter className="mt-5">
            <SheetClose asChild>
              <div className="flex gap-5">
                <Button variant="destructive" className="">
                  Cancel
                </Button>

                <Button
                  disabled={!(selectedTime && date)}
                  onClick={() => saveBooking()}
                >
                  Book
                </Button>
              </div>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default BookingSection;
