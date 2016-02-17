export default function isAdminMode(get) {
  const user = get(['user']);

  return user.isAdmin && !user.forceUser;
}
