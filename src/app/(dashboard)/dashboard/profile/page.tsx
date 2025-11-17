import React from "react";

import UsersByIdPageClient from "../users/[id]/page.client";

export default function ProfilePage() {
  return (
    <div>
      <UsersByIdPageClient isProfile={true} />
    </div>
  );
}
