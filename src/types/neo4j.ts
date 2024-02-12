import type {
  Node,
  PathSegment,
  Point,
  Relationship,
  Integer,
  Path,
} from "neo4j-driver";
import { PlaceId, PlaceRole, RouteKind } from ".";

export type PlaceNode = Node<
  Integer,
  {
    role: PlaceRole;
    name: string;
    placeId: PlaceId;
    coordinates: Point;
  },
  "Place"
>;

export type RouteRelationship = Relationship<
  Integer,
  { kind: RouteKind },
  "ADJACENT_TO"
>;

export interface RoutePathSegment extends PathSegment {
  start: PlaceNode;
  end: PlaceNode;
  relationship: RouteRelationship;
}

export interface RoutePath extends Path {
  start: PlaceNode;
  end: PlaceNode;
  segments: Array<RoutePathSegment>;
}
