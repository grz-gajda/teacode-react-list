export type RawContact = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: "Male" | "Female";
  avatar: string | null;
};

export const getContactsFixtures: RawContact[] = [
  {
    id: 1,
    first_name: "Suzie",
    last_name: "Kydd",
    email: "skydd0@prnewswire.com",
    gender: "Female",
    avatar: "https://robohash.org/fugiatautemodit.png?size=50x50&set=set1",
  },
  {
    id: 2,
    first_name: "Finley",
    last_name: "Fenich",
    email: "ffenich1@spotify.com",
    gender: "Male",
    avatar:
      "https://robohash.org/doloribusaspernaturea.png?size=50x50&set=set1",
  },
  {
    id: 44,
    first_name: "Colan",
    last_name: "Aldwinckle",
    email: "caldwinckle17@ed.gov",
    gender: "Male",
    avatar: null,
  },
  {
    id: 63,
    first_name: "Rorie",
    last_name: "Tregenna",
    email: "rtregenna1q@epa.gov",
    gender: "Female",
    avatar: null,
  },
  {
    id: 86,
    first_name: "Lyndell",
    last_name: "Aspin",
    email: "laspin2d@independent.co.uk",
    gender: "Female",
    avatar: "https://robohash.org/odiosolutaullam.png?size=50x50&set=set1",
  },
];

export async function getContacts(): Promise<RawContact[]> {
  const getContactsEndpoint = process.env.REACT_APP_CONTACTS_LIST_URL || "";
  const response = await fetch(getContactsEndpoint);
  if (!response.ok) {
    throw new Error(
      `Expected response with code 200 but received ${response.status}`
    );
  }

  return response.json();
}
