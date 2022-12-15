import { memo } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

export type RecordProps = {
  avatarUrl?: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: "Male" | "Female";
  checked: boolean;
  onCheck: () => void;
};

export function Record({
  avatarUrl,
  firstName,
  lastName,
  email,
  gender,
  checked,
  onCheck,
}: RecordProps) {
  const genderEmoji = gender === "Male" ? "👨" : "👩";

  return (
    <div className="flex mt-2 mb-2">
      {avatarUrl && avatarUrl.length > 0 && (
        <div className="rounded-lg ml-4 mr-4">
          <LazyLoadImage
            src={avatarUrl}
            alt={`${firstName} ${lastName}`}
            width={50}
            height={50}
          />
        </div>
      )}

      <div className="flex flex-col justify-end">
        <span>
          {genderEmoji} {firstName} {lastName}
        </span>
        <a href={`mailto:${email}`} className="text-xs text-gray-500">
          {email}
        </a>
      </div>

      <div className="flex grow items-center justify-end">
        <label>
          <input type="checkbox" checked={checked} onChange={onCheck} />
          <span className=""></span>
        </label>
      </div>
    </div>
  );
}

export const MemoizedRecord = memo(Record, (prevProps, nextProps) => {
  return (
    prevProps.avatarUrl === nextProps.avatarUrl &&
    prevProps.checked === nextProps.checked &&
    prevProps.email === nextProps.email &&
    prevProps.firstName === nextProps.firstName &&
    prevProps.gender === nextProps.gender &&
    prevProps.lastName === nextProps.lastName
  );
});
