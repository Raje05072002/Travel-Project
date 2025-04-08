
import styled from 'styled-components';

const SkeletonContainer = styled.div`
  width: 100%;
  min-height: calc(100vh - 120px);
  padding: 2rem;
`;

const SkeletonHeader = styled.div`
  height: 3rem;
  width: 60%;
  background-color: ${({ theme }) => theme?.colors?.light || defaultheme.colors.light};
  margin-bottom: 2rem;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
`;

const SkeletonCard = styled.div`
  height: 300px;
  width: 100%;
  background-color: ${({ theme }) => theme?.colors?.light || defaultheme.colors.light};
  margin-bottom: 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
`;

const LoadingSkeleton = () => {
  return (
    <SkeletonContainer>
      <SkeletonHeader />
      <SkeletonCard />
      <SkeletonCard />
    </SkeletonContainer>
  );
};

export default LoadingSkeleton;