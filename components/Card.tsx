import { Models } from "node-appwrite";
import Link from "next/link";
import Thumbnail from "@/components/Thumbnail";
import { convertFileSize } from "@/lib/utils";
import FormattedDateTime from "@/components/FormattedDateTime";
import ActionDropdown from "@/components/ActionDropdown";

const Card = ({
  file,
  onClick,
}: {
  file: Models.Document;
  onClick: () => void;
}) => {
  return (
    <div className="file-card" onClick={onClick}>
      <div className="flex justify-between">
        <div onClick={(e) => e.stopPropagation()}>
          <Thumbnail
            type={file.type}
            extension={file.extension}
            url={file.url}
            className="!size-20"
            imageClassName="!size-11"
          />
        </div>

        <div
          className="flex flex-col items-end justify-between"
          onClick={(e) => e.stopPropagation()}
        >
          <ActionDropdown file={file} />
          <p className="body-1">{convertFileSize(file.size)}</p>
        </div>
      </div>

      <div className="file-card-details">
        <p className="subtitle-2 line-clamp-1">{file.name}</p>
        <FormattedDateTime
          date={file.$createdAt}
          className="body-2 text-light-100"
        />
        <p className="caption line-clamp-1 text-light-200">
          By: {file.owner.fullName}
        </p>
      </div>
    </div>
  );
};
export default Card;
