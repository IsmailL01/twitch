import { getRecommended } from '@/src/lib/services/recomended-services';
import { getFollowedUsers } from '@/src/lib/services/follow-service';
import { Wrapper } from './Wrapper';
import { ToggleCollapsed, ToggleSkeleton } from './ToggleCollapsed';
import { Recommended, RecommendedSkeleton } from './Recommended';
import Following, { FollowingSkeleton } from './Following';

const Sidebar = async () => {
  const recommended = await getRecommended();
  const following = await getFollowedUsers();
  return (
    <Wrapper>
      <ToggleCollapsed />
      <div className='space-y-4 pt-4 lg:pt-0'>
        <Following data={following} />
        <Recommended data={recommended} />
      </div>
    </Wrapper>
  );
};

const SidebarSkeleton = () => {
  return (
    <aside className='fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#2D2E45] z-50'>
      <ToggleSkeleton />
      <FollowingSkeleton />
      <RecommendedSkeleton />
    </aside>
  );
};

export { SidebarSkeleton };

export default Sidebar;
