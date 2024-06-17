const { gql, default: request, GraphQLClient } = require("graphql-request");

const MASTER_URL = `https://us-east-1-shared-usea1-02.cdn.hygraph.com/content/${process.env.NEXT_PUBLIC_MASTER_URL_KEY}/master`;

const getCategory = async () => {
  const query = gql`
    query Category {
      categories {
        bgcolor {
          hex
        }
        id
        name
        icon {
          url
        }
      }
    }
  `;

  const result = await request(MASTER_URL, query);
  return result;
};

const getAllBusinessList = async () => {
  const query = gql`
    query BusinessList {
      businessLists {
        about
        address
        category {
          name
        }
        doctors {
          name
        }
        email
        images {
          url
        }
        id
        name
      }
    }
  `;
  const result = await request(MASTER_URL, query);
  return result;
};

const getBusinessByCategory = async (category) => {
  const query =
    gql`
    query MyQuery {
        businessLists(where: {category:
            {name: "` +
    category +
    `"}}) {
          about
          address
          category {
            name
          }
          email
          id
          name
          images {
            url
          }
        }
      }
      `;
  const result = await request(MASTER_URL, query);
  return result;
};

const getBusinessById = async (id) => {
  const query =
    gql`
  query GetBusinessById {
    businessList(where: {id: "` +
    id +
    `"}) {
      about
      address
      category {
        name
      }
      email
      id
      name
      images {
        url
      }
    }
  }
  `;
  const result = await request(MASTER_URL, query);
  return result;
};

const createNewBooking = async (
  businessId,
  date,
  time,
  userEmail,
  userName,
  telephone
) => {
  const mutationQuery =
    gql`
  mutation CreateBooking {
    createBooking(
      data: {progressStatus: Booked,
        businessList: {connect: {id: "` +
    businessId +
    `"}},
         date: "` +
    date +
    `", time: "` +
    time +
    `",
         userEmail: "` +
    userEmail +
    `",
          userName: "` +
    userName +
    `",
          telephone: "` +
    telephone +
    `",}
    ) {
      id
    }
    publishManyBookings(to: PUBLISHED) {
      count
    }
  }
  `;
  const result = await request(MASTER_URL, mutationQuery);
  return result;
};

const BusinessBookedSlot = async (businessId, date) => {
  const query =
    gql`
  query BusinessBookedSlot {
    bookings(where: {businessList:
      {id: "` +
    businessId +
    `"}, date: "` +
    date +
    `"}) {
      date
      time
    }
  }
  `;
  const result = await request(MASTER_URL, query);
  return result;
};

const GetUserBookingHistory = async (userEmail) => {
  const query =
    gql`
  query GetUserBookingHistory {
    bookings(where: {userEmail: "` +
    userEmail +
    `"}
    orderBy: publishedAt_DESC) {
      businessList {
        name
        images {
          url
        }
        address
      }
      progressStatus
      date
      time
      id
    }
  }
  `;

  try {
    const result = await request(MASTER_URL, query);
    return result;
  } catch (error) {
    console.error("Failed to fetch booking history:", error);
    throw error;
  }
};

const deleteBooking = async (bookingId) => {
  const mutationQuery =
    gql`
    mutation DeleteBooking {
      deleteBooking(where: { id: "` +
    bookingId +
    `" }) {
        id
      }
    }
  `;

  try {
    const result = await request(MASTER_URL, mutationQuery);
    return result;
  } catch (error) {
    console.error("Failed to delete booking:", error);
    throw error;
  }
};

export default {
  getCategory,
  getAllBusinessList,
  getBusinessByCategory,
  getBusinessById,
  createNewBooking,
  BusinessBookedSlot,
  GetUserBookingHistory,
  deleteBooking,
};
