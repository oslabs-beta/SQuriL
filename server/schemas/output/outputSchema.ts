import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  Allpeople?: Maybe<Array<Maybe<People>>>;
  Allplanet?: Maybe<Array<Maybe<Planet>>>;
  people_by_foreign_keys?: Maybe<Array<Maybe<People>>>;
  people_by_id?: Maybe<Array<Maybe<People>>>;
  planet_by_id?: Maybe<Array<Maybe<Planet>>>;
};


export type QueryPeople_By_Foreign_KeysArgs = {
  find: PlanetFind;
};


export type QueryPeople_By_IdArgs = {
  id: Scalars['ID'];
};


export type QueryPlanet_By_IdArgs = {
  id: Scalars['ID'];
};

export type People = {
  __typename?: 'people';
  birth_year?: Maybe<Scalars['String']>;
  created_date?: Maybe<Scalars['String']>;
  eye_color?: Maybe<Scalars['String']>;
  gender?: Maybe<Scalars['String']>;
  hair_color?: Maybe<Scalars['String']>;
  height?: Maybe<Scalars['Int']>;
  id: Scalars['ID'];
  mass?: Maybe<Scalars['Float']>;
  name?: Maybe<Scalars['String']>;
  planet_id?: Maybe<Array<Maybe<Planet>>>;
  skin_color?: Maybe<Scalars['String']>;
  updated_date?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type Planet = {
  __typename?: 'planet';
  climate?: Maybe<Scalars['String']>;
  created_date?: Maybe<Scalars['String']>;
  diameter?: Maybe<Scalars['Int']>;
  gravity?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  orbital_period?: Maybe<Scalars['Int']>;
  population?: Maybe<Scalars['Int']>;
  rotation_period?: Maybe<Scalars['Int']>;
  surface_water?: Maybe<Scalars['String']>;
  terrain?: Maybe<Scalars['String']>;
  updated_date?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type PlanetFind = {
  planet_id: Scalars['Int'];
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  people: ResolverTypeWrapper<People>;
  planet: ResolverTypeWrapper<Planet>;
  planetFind: PlanetFind;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Boolean: Scalars['Boolean'];
  Float: Scalars['Float'];
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  Query: {};
  String: Scalars['String'];
  people: People;
  planet: Planet;
  planetFind: PlanetFind;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  Allpeople?: Resolver<Maybe<Array<Maybe<ResolversTypes['people']>>>, ParentType, ContextType>;
  Allplanet?: Resolver<Maybe<Array<Maybe<ResolversTypes['planet']>>>, ParentType, ContextType>;
  people_by_foreign_keys?: Resolver<Maybe<Array<Maybe<ResolversTypes['people']>>>, ParentType, ContextType, RequireFields<QueryPeople_By_Foreign_KeysArgs, 'find'>>;
  people_by_id?: Resolver<Maybe<Array<Maybe<ResolversTypes['people']>>>, ParentType, ContextType, RequireFields<QueryPeople_By_IdArgs, 'id'>>;
  planet_by_id?: Resolver<Maybe<Array<Maybe<ResolversTypes['planet']>>>, ParentType, ContextType, RequireFields<QueryPlanet_By_IdArgs, 'id'>>;
}>;

export type PeopleResolvers<ContextType = any, ParentType extends ResolversParentTypes['people'] = ResolversParentTypes['people']> = ResolversObject<{
  birth_year?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  created_date?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  eye_color?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  gender?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  hair_color?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  height?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  mass?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  planet_id?: Resolver<Maybe<Array<Maybe<ResolversTypes['planet']>>>, ParentType, ContextType>;
  skin_color?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updated_date?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PlanetResolvers<ContextType = any, ParentType extends ResolversParentTypes['planet'] = ResolversParentTypes['planet']> = ResolversObject<{
  climate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  created_date?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  diameter?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  gravity?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  orbital_period?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  population?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  rotation_period?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  surface_water?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  terrain?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updated_date?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  Query?: QueryResolvers<ContextType>;
  people?: PeopleResolvers<ContextType>;
  planet?: PlanetResolvers<ContextType>;
}>;

