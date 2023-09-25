import { useContext, useMemo } from "react";
import ProjectList from "../Project/ProjectList";
import { AppContext } from "../context/appContext";
import PageContent from "../Layout/PageContent";
import {
  Chip,
  CircleBadge,
  EnumChipStyle,
  EnumFlexItemContentAlign,
  EnumFlexItemContentDirection,
  EnumFlexItemMargin,
  EnumPanelStyle,
  EnumTextStyle,
  FlexItem,
  HorizontalRule,
  Icon,
  Panel,
  Text,
} from "@amplication/ui/design-system";
import { getWorkspaceColor } from "./WorkspaceSelector";
import { EnumSubscriptionPlan } from "../models";
import AddNewProject from "../Project/AddNewProject";
import { GET_WORKSPACE_MEMBERS, TData as MemberListData } from "./MemberList";
import { useQuery } from "@apollo/client";
import * as models from "../models";
import { Link } from "react-router-dom";

const CLASS_NAME = "workspace-overview";
const PAGE_TITLE = "Workspace Overview";

const SUBSCRIPTION_TO_CHIP_STYLE: {
  [key in EnumSubscriptionPlan]: EnumChipStyle;
} = {
  [EnumSubscriptionPlan.Free]: EnumChipStyle.ThemePurple,
  [EnumSubscriptionPlan.Pro]: EnumChipStyle.ThemeBlue,
  [EnumSubscriptionPlan.Enterprise]: EnumChipStyle.ThemeGreen,
};

export const WorkspaceOverview = () => {
  const { currentWorkspace, projectsList } = useContext(AppContext);

  const { data: membersData } = useQuery<MemberListData>(GET_WORKSPACE_MEMBERS);

  const membersCount = useMemo(() => {
    return (
      membersData?.workspaceMembers.filter(
        (member) => member.type === models.EnumWorkspaceMemberType.User
      ).length || 0
    );
  }, [membersData]);

  return (
    <PageContent className={CLASS_NAME} pageTitle={PAGE_TITLE}>
      <FlexItem end={<AddNewProject />} margin={EnumFlexItemMargin.None} />
      <HorizontalRule doubleSpacing />

      <Panel panelStyle={EnumPanelStyle.Bold}>
        <FlexItem
          start={
            <CircleBadge
              size="xlarge"
              name={currentWorkspace.name || ""}
              color={getWorkspaceColor(
                currentWorkspace.subscription?.subscriptionPlan
              )}
            />
          }
        >
          <FlexItem contentDirection={EnumFlexItemContentDirection.Column}>
            <Chip
              chipStyle={
                SUBSCRIPTION_TO_CHIP_STYLE[
                  currentWorkspace.subscription?.subscriptionPlan
                ]
              }
            >
              {currentWorkspace.subscription?.subscriptionPlan ||
                EnumSubscriptionPlan.Free}{" "}
              Plan
            </Chip>

            <Text textStyle={EnumTextStyle.H3}>{currentWorkspace.name}</Text>
          </FlexItem>
          <FlexItem.FlexEnd alignSelf={EnumFlexItemContentAlign.Start}>
            {membersData && membersData.workspaceMembers && (
              <Link to={`/${currentWorkspace.id}/members`}>
                <Text textStyle={EnumTextStyle.Tag}>
                  <Icon icon="users" />
                  {membersCount} members
                </Text>
              </Link>
            )}
          </FlexItem.FlexEnd>
        </FlexItem>
      </Panel>
      <ProjectList projects={projectsList} workspaceId={currentWorkspace.id} />
    </PageContent>
  );
};

export default WorkspaceOverview;