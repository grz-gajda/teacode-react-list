import { Grid, MemoizedRecord } from "../../components/grid";
import { TextInput } from "../../components/text-input";
import { useFilteredContactsList } from "../../hooks/use-contacts-list";
import { useToggledMap } from "../../hooks/use-toggled-map";

export type Contact = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: "Male" | "Female";
  avatar: string;
};

export function ContactsList() {
  const { get: getChecked, set: setChecked } = useToggledMap();
  const { contactsList, isLoading, error, setFilterPhrase } =
    useFilteredContactsList();

  return (
    <section className="container mx-auto rounded p-4">
      <header className="border-b-stone-500 border-b-2 mb-2 pb-2">
        <h1 className="text-center text-lg uppercase font-bold">
          Lista kontaktów
        </h1>
        <p className="text-center text-xs">
          TeaCode React.js List Recruitment Challenge
        </p>
      </header>

      <div className="w-full max-w-xs">
        <div className="mb-4">
          <TextInput
            name="first_last_name"
            placeholder="Filter by name"
            onChange={setFilterPhrase}
          />
        </div>
      </div>

      <Grid>
        {isLoading && <div>Trwa ładowanie</div>}

        {!isLoading && error && <div>Coś poszło nie tak: {error.message}</div>}

        {!isLoading &&
          !error &&
          contactsList.map(
            ({ id, avatar, first_name, last_name, email, gender }) => (
              <MemoizedRecord
                key={`contact-${id}`}
                avatarUrl={avatar || undefined}
                firstName={first_name}
                lastName={last_name}
                email={email}
                gender={gender}
                checked={getChecked(id)}
                onCheck={() => setChecked(id)}
              />
            )
          )}
      </Grid>
    </section>
  );
}
