"use client";

import { addressRequestSchema } from "@/types/address/addressRequest";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createAddressDefaultValues } from "@/lib/dummy-datas/form/address/defaultValues";
import { useEffect, useState, useTransition } from "react";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PhoneInput } from "@/components/ui/phone-input";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {} from "@radix-ui/react-select";
import { getCitiesByCountryIdAsync } from "@/lib/actions/city.actions";
import { CityDTO } from "@/types/city/cityDTO";
import { DEFAULT_COUNTRY_ID } from "@/constants/parameters";
import { Loader } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { UUID } from "crypto";
import { getDistrictsByCityIdAsync } from "@/lib/actions/district.actions";
import { DistrictDTO } from "@/types/district/districtDTO";
import { getNeighborHoodsByDistrictIdAsync } from "@/lib/actions/neighborhood.actions";
import { NeighborhoodDTO } from "@/types/neighborhood/neighborHoodDTO";
import { FieldErrors } from "react-hook-form";

const ShippingAddressForm = ({ userId }: { userId: UUID }) => {
  const form = useForm<z.infer<typeof addressRequestSchema>>({
    resolver: zodResolver(addressRequestSchema),
    defaultValues: {
      userId: userId,
      ...createAddressDefaultValues,
    },
  });

  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);
  const [isAddressFormPending, startAddressFormTransition] = useTransition();
  const [cities, setCities] = useState<CityDTO[]>([]);
  const [districts, setDistricts] = useState<DistrictDTO[]>([]);
  const [neighborhoods, setNeighborhoods] = useState<NeighborhoodDTO[]>([]);
  const [isDistrictsDisabled, setIsDistrictsDisabled] = useState<boolean>(true);
  const [isNeighborhoodsDisabled, setIsNeighborhoodsDisabled] =
    useState<boolean>(true);

  const createAddress = async (
    values: z.infer<typeof addressRequestSchema>
  ) => {
    try {
      startAddressFormTransition(async () => {
        console.log(values);
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to create address");
    }
  };

  const formPostError = (
    errors: FieldErrors<z.infer<typeof addressRequestSchema>>
  ) => {
    console.error("Form validation errors:", errors);
  };

  const fetchCitiesAsync = async () => {
    try {
      const citiesResult = await getCitiesByCountryIdAsync(DEFAULT_COUNTRY_ID);
      if (!citiesResult.isSuccessful) {
        setIsModalOpen(false);
        toast.error(citiesResult.errorDto?.errors[0]);
        return;
      }
      setCities(citiesResult.data as CityDTO[]);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch cities");
    }
  };

  const fetchDistrictsAsync = async () => {
    const cityId = form.getValues("cityId");
    if (!cityId) {
      toast.error("Please select a city first");
      setDistricts([]);
      return;
    }

    try {
      const districtsResult = await getDistrictsByCityIdAsync(cityId);
      if (!districtsResult.isSuccessful) {
        toast.error(districtsResult.message.message);
        setIsDistrictsDisabled(true);
        setDistricts([]);
        return;
      }

      setIsDistrictsDisabled(false);
      setDistricts(districtsResult.data as DistrictDTO[]);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch districts");
    }
  };

  const fetchNeighborhoodsAsync = async () => {
    const districtId = form.getValues("districtId");
    if (!districtId) {
      toast.error("Please select a district first");
      setNeighborhoods([]);
      return;
    }

    try {
      const neighborhoodsResult = await getNeighborHoodsByDistrictIdAsync(
        districtId
      );
      if (!neighborhoodsResult.isSuccessful) {
        toast.error(neighborhoodsResult.message.message);
        setIsNeighborhoodsDisabled(true);
        setNeighborhoods([]);
        return;
      }

      setIsNeighborhoodsDisabled(false);
      setNeighborhoods(neighborhoodsResult.data as NeighborhoodDTO[]);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch neighborhoods");
    }
  };

  const resetCityRelateds = () => {
    form.setValue("districtId", "");
    form.setValue("neighborhoodId", "");
    setIsNeighborhoodsDisabled(true);
  };

  const resetDistrictRelateds = () => {
    form.setValue("neighborhoodId", "");
    setIsNeighborhoodsDisabled(true);
  };

  useEffect(() => {
    const initializeForm = async () => {
      startAddressFormTransition(async () => {
        await fetchCitiesAsync();
      });
    };
    initializeForm();
  }, []);

  return (
    <>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent
          className="w-full p-3 md:min-w-[500px] lg:min-w-[700px] max-h-[90vh] overflow-y-auto"
          onPointerDownOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle>Create Address</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(createAddress, formPostError)}>
              <div className="grid grid-cols-1 gap-3 mb-5 lg:grid-cols-2">
                {isAddressFormPending && (
                  <div className="absolute inset-0 flex items-center justify-center bg-background/50">
                    <Loader className="w-8 h-8 animate-spin" />
                  </div>
                )}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="surname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Surname</FormLabel>
                      <FormControl>
                        <Input placeholder="Your surname..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <PhoneInput {...field} onChange={field.onChange} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cityId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={async (value) => {
                            field.onChange(value);
                            resetCityRelateds();
                            if (value) {
                              await fetchDistrictsAsync();
                            }
                          }}
                          value={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Please Select..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {cities.map((city) => (
                                <SelectItem
                                  key={city.id}
                                  value={city.id}
                                  className="cursor-pointer"
                                >
                                  {city.name}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="districtId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>District</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={async (value) => {
                            field.onChange(value);
                            resetDistrictRelateds();
                            if (value) {
                              await fetchNeighborhoodsAsync();
                            }
                          }}
                          value={field.value}
                          disabled={isDistrictsDisabled}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Please Select..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {districts.map((district) => (
                                <SelectItem
                                  key={district.id}
                                  value={district.id}
                                  className="cursor-pointer"
                                >
                                  {district.name}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="neighborhoodId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Neighborhood</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                          disabled={isNeighborhoodsDisabled}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Please Select..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {neighborhoods.map((neighborhood) => (
                                <SelectItem
                                  key={neighborhood.id}
                                  value={neighborhood.id}
                                  className="cursor-pointer"
                                >
                                  {neighborhood.name}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="mb-5">
                    <FormLabel>Address Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Please enter address title"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="detail"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Address Detail</FormLabel>
                    <FormDescription className="text-xs text-gray-600 md:text-sm">
                      Make sure you enter detailed information such as
                      neighborhood, street, avenue, building, etc. so that your
                      cargo can reach you without any problems.
                    </FormDescription>
                    <FormControl>
                      <Textarea
                        placeholder="Please enter the street, neighborhood, avenue and other necessary address details."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                className="w-full
          bg-seagreen
          font-bold 
          disabled:bg-black
          disabled:opacity-80
          disabled:cursor-not-allowed
          hover:bg-seagreen/80"
                type="submit"
                disabled={isAddressFormPending}
              >
                {isAddressFormPending ? (
                  <Loader className="w-4 h-4 animate-spin" />
                ) : (
                  "Save"
                )}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <Toaster />
    </>
  );
};

export default ShippingAddressForm;
