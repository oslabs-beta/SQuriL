import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Films = {
  __typename?: 'films';
  _id: Scalars['ID'];
  director?: Maybe<Scalars['String']>;
  episode_id?: Maybe<Scalars['Int']>;
  opening_crawl?: Maybe<Scalars['String']>;
  producer?: Maybe<Scalars['String']>;
  release_date?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type People = {
  __typename?: 'people';
  _id: Scalars['ID'];
  birth_year?: Maybe<Scalars['String']>;
  eye_color?: Maybe<Scalars['String']>;
  gender?: Maybe<Scalars['String']>;
  hair_color?: Maybe<Scalars['String']>;
  height?: Maybe<Scalars['Int']>;
  homeworld_id?: Maybe<Scalars['Int']>;
  mass?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  skin_color?: Maybe<Scalars['String']>;
  species_id?: Maybe<Array<Maybe<Species>>>;
};

export type People_In_Films = {
  __typename?: 'people_in_films';
  _id: Scalars['ID'];
  film_id?: Maybe<Scalars['Int']>;
  person_id?: Maybe<Array<Maybe<People>>>;
};

export type Pilots = {
  __typename?: 'pilots';
  _id: Scalars['ID'];
  person_id?: Maybe<Array<Maybe<People>>>;
  vessel_id?: Maybe<Scalars['Int']>;
};

export type Planets = {
  __typename?: 'planets';
  _id: Scalars['ID'];
  climate?: Maybe<Scalars['String']>;
  diameter?: Maybe<Scalars['Int']>;
  gravity?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  orbital_period?: Maybe<Scalars['Int']>;
  population?: Maybe<Scalars['Int']>;
  rotation_period?: Maybe<Scalars['Int']>;
  surface_water?: Maybe<Scalars['String']>;
  terrain?: Maybe<Scalars['String']>;
};

export type Planets_In_Films = {
  __typename?: 'planets_in_films';
  _id: Scalars['ID'];
  film_id?: Maybe<Array<Maybe<Films>>>;
  planet_id?: Maybe<Scalars['Int']>;
};

export type Species = {
  __typename?: 'species';
  _id: Scalars['ID'];
  average_height?: Maybe<Scalars['String']>;
  average_lifespan?: Maybe<Scalars['String']>;
  classification?: Maybe<Scalars['String']>;
  eye_colors?: Maybe<Scalars['String']>;
  hair_colors?: Maybe<Scalars['String']>;
  homeworld_id?: Maybe<Array<Maybe<Planets>>>;
  language?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  skin_colors?: Maybe<Scalars['String']>;
};

export type Species_In_Films = {
  __typename?: 'species_in_films';
  _id: Scalars['ID'];
  film_id?: Maybe<Array<Maybe<Films>>>;
  species_id?: Maybe<Scalars['Int']>;
};

export type Starship_Specs = {
  __typename?: 'starship_specs';
  MGLT?: Maybe<Scalars['String']>;
  _id: Scalars['ID'];
  hyperdrive_rating?: Maybe<Scalars['String']>;
  vessel_id?: Maybe<Array<Maybe<Vessels>>>;
};

export type Users = {
  __typename?: 'users';
  token?: Maybe<Scalars['String']>;
  user_id: Scalars['ID'];
  username?: Maybe<Scalars['String']>;
};

export type Vessels = {
  __typename?: 'vessels';
  _id: Scalars['ID'];
  cargo_capacity?: Maybe<Scalars['String']>;
  consumables?: Maybe<Scalars['String']>;
  cost_in_credits?: Maybe<Scalars['Int']>;
  crew?: Maybe<Scalars['Int']>;
  length?: Maybe<Scalars['String']>;
  manufacturer?: Maybe<Scalars['String']>;
  max_atmosphering_speed?: Maybe<Scalars['String']>;
  model?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  passengers?: Maybe<Scalars['Int']>;
  vessel_class?: Maybe<Scalars['String']>;
  vessel_type?: Maybe<Scalars['String']>;
};

export type Vessels_In_Films = {
  __typename?: 'vessels_in_films';
  _id: Scalars['ID'];
  film_id?: Maybe<Scalars['Int']>;
  vessel_id?: Maybe<Array<Maybe<Vessels>>>;
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
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  String: ResolverTypeWrapper<Scalars['String']>;
  films: ResolverTypeWrapper<Films>;
  people: ResolverTypeWrapper<People>;
  people_in_films: ResolverTypeWrapper<People_In_Films>;
  pilots: ResolverTypeWrapper<Pilots>;
  planets: ResolverTypeWrapper<Planets>;
  planets_in_films: ResolverTypeWrapper<Planets_In_Films>;
  species: ResolverTypeWrapper<Species>;
  species_in_films: ResolverTypeWrapper<Species_In_Films>;
  starship_specs: ResolverTypeWrapper<Starship_Specs>;
  users: ResolverTypeWrapper<Users>;
  vessels: ResolverTypeWrapper<Vessels>;
  vessels_in_films: ResolverTypeWrapper<Vessels_In_Films>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Boolean: Scalars['Boolean'];
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  String: Scalars['String'];
  films: Films;
  people: People;
  people_in_films: People_In_Films;
  pilots: Pilots;
  planets: Planets;
  planets_in_films: Planets_In_Films;
  species: Species;
  species_in_films: Species_In_Films;
  starship_specs: Starship_Specs;
  users: Users;
  vessels: Vessels;
  vessels_in_films: Vessels_In_Films;
}>;

export type FilmsResolvers<ContextType = any, ParentType extends ResolversParentTypes['films'] = ResolversParentTypes['films']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  director?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  episode_id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  opening_crawl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  producer?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  release_date?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PeopleResolvers<ContextType = any, ParentType extends ResolversParentTypes['people'] = ResolversParentTypes['people']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  birth_year?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  eye_color?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  gender?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  hair_color?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  height?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  homeworld_id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  mass?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  skin_color?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  species_id?: Resolver<Maybe<Array<Maybe<ResolversTypes['species']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type People_In_FilmsResolvers<ContextType = any, ParentType extends ResolversParentTypes['people_in_films'] = ResolversParentTypes['people_in_films']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  film_id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  person_id?: Resolver<Maybe<Array<Maybe<ResolversTypes['people']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PilotsResolvers<ContextType = any, ParentType extends ResolversParentTypes['pilots'] = ResolversParentTypes['pilots']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  person_id?: Resolver<Maybe<Array<Maybe<ResolversTypes['people']>>>, ParentType, ContextType>;
  vessel_id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PlanetsResolvers<ContextType = any, ParentType extends ResolversParentTypes['planets'] = ResolversParentTypes['planets']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  climate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  diameter?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  gravity?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  orbital_period?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  population?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  rotation_period?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  surface_water?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  terrain?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Planets_In_FilmsResolvers<ContextType = any, ParentType extends ResolversParentTypes['planets_in_films'] = ResolversParentTypes['planets_in_films']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  film_id?: Resolver<Maybe<Array<Maybe<ResolversTypes['films']>>>, ParentType, ContextType>;
  planet_id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SpeciesResolvers<ContextType = any, ParentType extends ResolversParentTypes['species'] = ResolversParentTypes['species']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  average_height?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  average_lifespan?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  classification?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  eye_colors?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  hair_colors?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  homeworld_id?: Resolver<Maybe<Array<Maybe<ResolversTypes['planets']>>>, ParentType, ContextType>;
  language?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  skin_colors?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Species_In_FilmsResolvers<ContextType = any, ParentType extends ResolversParentTypes['species_in_films'] = ResolversParentTypes['species_in_films']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  film_id?: Resolver<Maybe<Array<Maybe<ResolversTypes['films']>>>, ParentType, ContextType>;
  species_id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Starship_SpecsResolvers<ContextType = any, ParentType extends ResolversParentTypes['starship_specs'] = ResolversParentTypes['starship_specs']> = ResolversObject<{
  MGLT?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  hyperdrive_rating?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  vessel_id?: Resolver<Maybe<Array<Maybe<ResolversTypes['vessels']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UsersResolvers<ContextType = any, ParentType extends ResolversParentTypes['users'] = ResolversParentTypes['users']> = ResolversObject<{
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user_id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  username?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type VesselsResolvers<ContextType = any, ParentType extends ResolversParentTypes['vessels'] = ResolversParentTypes['vessels']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  cargo_capacity?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  consumables?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  cost_in_credits?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  crew?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  length?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  manufacturer?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  max_atmosphering_speed?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  model?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  passengers?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  vessel_class?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  vessel_type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Vessels_In_FilmsResolvers<ContextType = any, ParentType extends ResolversParentTypes['vessels_in_films'] = ResolversParentTypes['vessels_in_films']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  film_id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  vessel_id?: Resolver<Maybe<Array<Maybe<ResolversTypes['vessels']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  films?: FilmsResolvers<ContextType>;
  people?: PeopleResolvers<ContextType>;
  people_in_films?: People_In_FilmsResolvers<ContextType>;
  pilots?: PilotsResolvers<ContextType>;
  planets?: PlanetsResolvers<ContextType>;
  planets_in_films?: Planets_In_FilmsResolvers<ContextType>;
  species?: SpeciesResolvers<ContextType>;
  species_in_films?: Species_In_FilmsResolvers<ContextType>;
  starship_specs?: Starship_SpecsResolvers<ContextType>;
  users?: UsersResolvers<ContextType>;
  vessels?: VesselsResolvers<ContextType>;
  vessels_in_films?: Vessels_In_FilmsResolvers<ContextType>;
}>;

