"use client";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BookingHistoryList from "./_component/BookingHistoryList";
import GlobalApi from "../_services/GlobalApi";
import { useSession, useUser } from "@descope/nextjs-sdk/client";
import { toast } from "sonner";
import moment from "moment";

function MyBooking() {
  const { isAuthenticated } = useSession();
  const { user } = useUser();
  const [bookingHistory, setBookingHistory] = useState([]);
  const [bookingIsDeleted, setBookingIsDeleted] = useState(false);

  useEffect(() => {
    if (isAuthenticated && user?.email) {
      GetUserBookingHistory();
    }
  }, [isAuthenticated, user]);

  /**
   * Used to Get User Booking History
   */
  const GetUserBookingHistory = async () => {
    try {
      const resp = await GlobalApi.GetUserBookingHistory(user.email);
      console.log(resp);
      setBookingHistory(resp.bookings);
    } catch (error) {
      console.error("Error fetching booking history:", error);
    }
  };

  const filterData = (type) => {
    const result = bookingHistory.filter((item) => {
      const formattedDate = moment(item.date, "DD-MMM-YYYY").format(
        "YYYY-MM-DD"
      );

      const itemDateTime = new Date(`${formattedDate}T${item.time}`);
      const currentDateTime = new Date();

      if (type === "Booked") {
        return itemDateTime >= currentDateTime;
      } else {
        return itemDateTime <= currentDateTime;
      }
    });

    return result;
  };

  const cancelAppointment = async (booking) => {
    try {
      const response = await GlobalApi.deleteBooking(booking.id);

      console.log(response);
      if (response.deleteBooking.id) {
        toast.success("Booking Deleted Successfully!");
        setBookingIsDeleted(true);
      }
    } catch (error) {
      toast("Error while canceling booking!");
      console.log(error);
    }
  };

  return (
    <div className="my-10 mx-5 md:mx-36">
      <h2 className="font-bold text-[20px] my-2">My Bookings</h2>
      <Tabs defaultValue="Booked" className="w-full">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="Booked">Booked</TabsTrigger>
          <TabsTrigger value="Completed">Completed</TabsTrigger>
        </TabsList>
        <TabsContent value="Booked">
          {filterData("Booked").length > 0 ? (
            <BookingHistoryList
              bookingHistory={filterData("Booked")}
              type="Booked"
              cancelAppointment={cancelAppointment}
              GetUserBookingHistory={GetUserBookingHistory}
              bookingIsDeleted={bookingIsDeleted}
              setBookingIsDeleted={setBookingIsDeleted}
            />
          ) : (
            <>No bookings</>
          )}
        </TabsContent>
        <TabsContent value="Completed">
          <BookingHistoryList
            bookingHistory={filterData("Completed")}
            type="Completed"
            GetUserBookingHistory={GetUserBookingHistory}
            bookingIsDeleted={bookingIsDeleted}
            setBookingIsDeleted={setBookingIsDeleted}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default MyBooking;
