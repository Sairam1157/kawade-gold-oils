import { useEffect, useRef, useState, type ChangeEventHandler } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { ArrowLeft, Download, Lock, LogOut, Plus, RotateCcw, Trash2, Upload } from "lucide-react";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { useProductCatalog } from "@/context/ProductCatalogContext";
import { defaultAboutContent, useAboutContent, type ManufacturingStat } from "@/context/AboutContentContext";
import { useHomeContent, type Stat, type Testimonial } from "@/context/HomeContentContext";
import type { Product } from "@/data/products";
import {
  IMAGE_PRESET_IDS,
  IMAGE_PRESET_LABELS,
  type ImagePresetId,
} from "@/data/productImagePresets";
import {
  baseProducts,
  isBuiltInProductId,
  type CatalogStorageV1,
} from "@/lib/productCatalogStorage";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

function BuiltInProductEditor({ product }: { product: Product }) {
  const { updateBuiltInProduct, clearBuiltInOverrides, storage } = useProductCatalog();
  const base = baseProducts.find((b) => b.id === product.id)!;
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [category, setCategory] = useState(product.category);
  const [customImageUrl, setCustomImageUrl] = useState("");
  const [useCustomImage, setUseCustomImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setName(product.name);
    setPrice(product.price);
    setCategory(product.category);
    const override = storage.overrides[product.id];
    const hasCustomImage = override?.image && override.image !== base.image;
    setCustomImageUrl(hasCustomImage ? override.image : "");
    setUseCustomImage(hasCustomImage);
  }, [product.name, product.price, product.category, product.id, product.image, storage.overrides, base.image]);

  const override = storage.overrides[product.id];
  const isDirty =
    name !== base.name || price !== base.price || category !== base.category || (useCustomImage && customImageUrl !== base.image);

  const save = () => {
    updateBuiltInProduct(product.id, {
      name: name.trim() || base.name,
      price: price.trim() || base.price,
      category: category.trim() || base.category,
      image: useCustomImage ? customImageUrl : undefined,
    });
    toast.success("Saved", { description: `${name.trim() || base.name} updated on the site.` });
  };

  const reset = () => {
    clearBuiltInOverrides(product.id);
    toast.message("Restored defaults", { description: "This oil uses the original name and price again." });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setCustomImageUrl(result);
      setUseCustomImage(true);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="rounded-xl border bg-card p-4 space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Built-in oil
        </span>
        {override && Object.keys(override).length > 0 && (
          <Button type="button" variant="ghost" size="sm" className="h-8 gap-1 text-muted-foreground" onClick={reset}>
            <RotateCcw className="h-3.5 w-3.5" />
            Reset to default
          </Button>
        )}
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-1.5">
          <Label htmlFor={`name-${product.id}`}>Display name</Label>
          <Input id={`name-${product.id}`} value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor={`price-${product.id}`}>Price</Label>
          <Input
            id={`price-${product.id}`}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="e.g. ₹180/L"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor={`cat-${product.id}`}>Category label</Label>
          <Input id={`cat-${product.id}`} value={category} onChange={(e) => setCategory(e.target.value)} />
        </div>
        <div className="space-y-1.5">
          <Label>Image</Label>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id={`custom-image-${product.id}`}
                checked={useCustomImage}
                onChange={(e) => setUseCustomImage(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <Label htmlFor={`custom-image-${product.id}`} className="text-sm cursor-pointer">
                Use custom image
              </Label>
            </div>
            {useCustomImage ? (
              <div className="space-y-2">
                <Input
                  placeholder="https://example.com/image.jpg"
                  value={customImageUrl}
                  onChange={(e) => setCustomImageUrl(e.target.value)}
                />
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="h-3.5 w-3.5 mr-1" />
                    Upload from device
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                  {customImageUrl && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setCustomImageUrl("");
                        setUseCustomImage(false);
                      }}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  )}
                </div>
                {customImageUrl && (
                  <div className="mt-2">
                    <img src={customImageUrl} alt="Preview" className="h-20 w-20 object-cover rounded border" />
                  </div>
                )}
              </div>
            ) : (
              <div className="mt-2">
                <img src={base.image} alt="Default" className="h-20 w-20 object-cover rounded border" />
              </div>
            )}
          </div>
        </div>
      </div>
      <p className="text-xs text-muted-foreground">
        Default price: <span className="font-medium text-foreground">{base.price}</span>
        {isDirty ? " — click Save to publish your changes." : ""}
      </p>
      <Button type="button" size="sm" className="gold-gradient text-primary-foreground" onClick={save}>
        Save this product
      </Button>
    </div>
  );
}

function CustomProductEditor({ product }: { product: Product }) {
  const { storage, updateCustomProduct, removeCustomProduct } = useProductCatalog();
  const row = storage.customProducts.find((c) => c.id === product.id);
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [category, setCategory] = useState(product.category);
  const [imagePreset, setImagePreset] = useState<ImagePresetId>(row?.imagePreset ?? "cooking-oil");
  const [customImageUrl, setCustomImageUrl] = useState(row?.customImageUrl ?? "");
  const [useCustomImage, setUseCustomImage] = useState(!!row?.customImageUrl);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setName(product.name);
    setPrice(product.price);
    setCategory(product.category);
    setImagePreset(row?.imagePreset ?? "cooking-oil");
    setCustomImageUrl(row?.customImageUrl ?? "");
    setUseCustomImage(!!row?.customImageUrl);
  }, [product.name, product.price, product.category, product.id, row?.imagePreset, row?.customImageUrl]);

  if (!row) return null;

  const save = () => {
    updateCustomProduct(product.id, {
      name: name.trim() || "Oil",
      price: price.trim(),
      category: category.trim() || "Cooking Oil",
      imagePreset,
      customImageUrl: useCustomImage ? customImageUrl : undefined,
    });
    toast.success("Saved", { description: "Your oil card is updated." });
  };

  const remove = () => {
    removeCustomProduct(product.id);
    toast.success("Removed", { description: "This oil is no longer shown on the site." });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setCustomImageUrl(result);
      setUseCustomImage(true);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 space-y-3">
      <span className="text-xs font-medium uppercase tracking-wide text-primary">Your added oil</span>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-1.5">
          <Label htmlFor={`cname-${product.id}`}>Name</Label>
          <Input id={`cname-${product.id}`} value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor={`cprice-${product.id}`}>Price</Label>
          <Input id={`cprice-${product.id}`} value={price} onChange={(e) => setPrice(e.target.value)} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor={`ccat-${product.id}`}>Category</Label>
          <Input id={`ccat-${product.id}`} value={category} onChange={(e) => setCategory(e.target.value)} />
        </div>
        <div className="space-y-1.5">
          <Label>Photo</Label>
          <div className="space-y-2">
            <Select value={imagePreset} onValueChange={(v) => setImagePreset(v as ImagePresetId)} disabled={useCustomImage}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {IMAGE_PRESET_IDS.map((id) => (
                  <SelectItem key={id} value={id}>
                    {IMAGE_PRESET_LABELS[id]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id={`custom-image-${product.id}`}
                checked={useCustomImage}
                onChange={(e) => setUseCustomImage(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <Label htmlFor={`custom-image-${product.id}`} className="text-sm cursor-pointer">
                Use custom image
              </Label>
            </div>
            {useCustomImage && (
              <div className="space-y-2">
                <Input
                  placeholder="https://example.com/image.jpg"
                  value={customImageUrl}
                  onChange={(e) => setCustomImageUrl(e.target.value)}
                />
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="h-3.5 w-3.5 mr-1" />
                    Upload from device
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                  {customImageUrl && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setCustomImageUrl("");
                        setUseCustomImage(false);
                      }}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  )}
                </div>
                {customImageUrl && (
                  <div className="mt-2">
                    <img src={customImageUrl} alt="Preview" className="h-20 w-20 object-cover rounded border" />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button type="button" size="sm" className="gold-gradient text-primary-foreground" onClick={save}>
          Save
        </Button>
        <Button type="button" size="sm" variant="destructive" className="gap-1" onClick={remove}>
          <Trash2 className="h-3.5 w-3.5" />
          Remove
        </Button>
      </div>
    </div>
  );
}

function AddOilForm() {
  const { addCustomProduct } = useProductCatalog();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Cooking Oil");
  const [imagePreset, setImagePreset] = useState<ImagePresetId>("cooking-oil");
  const [customImageUrl, setCustomImageUrl] = useState("");
  const [useCustomImage, setUseCustomImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !price.trim()) {
      toast.error("Add a name and price", { description: "Both fields are required for a new oil card." });
      return;
    }
    addCustomProduct({
      name: name.trim(),
      price: price.trim(),
      category: category.trim() || "Cooking Oil",
      imagePreset,
      customImageUrl: useCustomImage ? customImageUrl : undefined,
    });
    setName("");
    setPrice("");
    setCategory("Cooking Oil");
    setImagePreset("cooking-oil");
    setCustomImageUrl("");
    setUseCustomImage(false);
    toast.success("Oil added", { description: "It now appears on the Products page and home highlights use the live catalog." });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setCustomImageUrl(result);
      setUseCustomImage(true);
    };
    reader.readAsDataURL(file);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-display text-xl">Add a new oil</CardTitle>
        <CardDescription>
          Creates a new product card visitors will see alongside your main oils. Pick a photo that best matches.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-1.5">
            <Label htmlFor="new-name">Name</Label>
            <Input id="new-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Rice Bran Oil" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="new-price">Price</Label>
            <Input id="new-price" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="e.g. ₹175/L" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="new-cat">Category</Label>
            <Input id="new-cat" value={category} onChange={(e) => setCategory(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label>Photo</Label>
            <div className="space-y-2">
              <Select value={imagePreset} onValueChange={(v) => setImagePreset(v as ImagePresetId)} disabled={useCustomImage}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {IMAGE_PRESET_IDS.map((id) => (
                    <SelectItem key={id} value={id}>
                      {IMAGE_PRESET_LABELS[id]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="new-custom-image"
                  checked={useCustomImage}
                  onChange={(e) => setUseCustomImage(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <Label htmlFor="new-custom-image" className="text-sm cursor-pointer">
                  Use custom image
                </Label>
              </div>
              {useCustomImage && (
                <div className="space-y-2">
                  <Input
                    placeholder="https://example.com/image.jpg"
                    value={customImageUrl}
                    onChange={(e) => setCustomImageUrl(e.target.value)}
                  />
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload className="h-3.5 w-3.5 mr-1" />
                      Upload from device
                    </Button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                    {customImageUrl && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setCustomImageUrl("");
                          setUseCustomImage(false);
                        }}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    )}
                  </div>
                  {customImageUrl && (
                    <div className="mt-2">
                      <img src={customImageUrl} alt="Preview" className="h-20 w-20 object-cover rounded border" />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="sm:col-span-2 lg:col-span-4">
            <Button type="submit" className="gap-2 gold-gradient text-primary-foreground">
              <Plus className="h-4 w-4" />
              Add oil card
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

function AdminDashboard() {
  const { products, storage, resetEntireCatalog, replaceCatalog } = useProductCatalog();
  const { logout } = useAdminAuth();
  const { content: about, setContent: setAbout, resetContent: resetAbout } = useAboutContent();
  const { content: home, setContent: setHome, resetContent: resetHome } = useHomeContent();
  const importInputRef = useRef<HTMLInputElement>(null);
  const [aboutDraft, setAboutDraft] = useState(about);
  const [statsDraft, setStatsDraft] = useState<Stat[]>(home.stats);
  const [testimonialsDraft, setTestimonialsDraft] = useState<Testimonial[]>(home.testimonials);
  const [manufacturingStatsDraft, setManufacturingStatsDraft] = useState<ManufacturingStat[]>(about.manufacturingStats);
  const [manufacturingImage, setManufacturingImage] = useState(about.manufacturingImage);
  const [aboutImage, setAboutImage] = useState(about.aboutImage);
  const [aboutYearsValue, setAboutYearsValue] = useState(about.aboutYearsValue);
  const [aboutYearsLabel, setAboutYearsLabel] = useState(about.aboutYearsLabel);
  const [phoneNumber1, setPhoneNumber1] = useState(about.phoneNumber1);
  const [phoneNumber2, setPhoneNumber2] = useState(about.phoneNumber2);
  const manufacturingFileInputRef = useRef<HTMLInputElement>(null);
  const aboutFileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setAboutDraft(about);
  }, [about]);

  useEffect(() => {
    setStatsDraft(home.stats);
    setTestimonialsDraft(home.testimonials);
  }, [home]);

  useEffect(() => {
    setManufacturingStatsDraft(about.manufacturingStats);
    setManufacturingImage(about.manufacturingImage);
    setAboutImage(about.aboutImage);
    setAboutYearsValue(about.aboutYearsValue);
    setAboutYearsLabel(about.aboutYearsLabel);
    setPhoneNumber1(about.phoneNumber1);
    setPhoneNumber2(about.phoneNumber2);
  }, [about]);

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(storage, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "kawade-catalog.json";
    a.click();
    URL.revokeObjectURL(a.href);
    toast.success("Download started", {
      description: "Place this file in your site’s public folder as kawade-catalog.json so new visitors see your prices.",
    });
  };

  const onImportFile: ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result as string) as CatalogStorageV1;
        if (data?.version !== 1 || typeof data.overrides !== "object" || !Array.isArray(data.customProducts)) {
          throw new Error("invalid");
        }
        replaceCatalog(data);
        toast.success("Catalog imported");
      } catch {
        toast.error("Invalid file", { description: "Choose a kawade-catalog.json file exported from this admin." });
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="container mx-auto max-w-4xl pb-20 pt-24">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold">Price &amp; products</h1>
          <p className="text-muted-foreground mt-1 text-sm max-w-xl">
            Edits are saved in this browser. To show the same prices to all visitors on a live site, use{" "}
            <strong className="text-foreground font-medium">Export JSON</strong>, upload{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">kawade-catalog.json</code> to your hosting{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">public</code> folder, and redeploy. Set a strong admin
            password with <code className="rounded bg-muted px-1 py-0.5 text-xs">VITE_ADMIN_PASSWORD</code> before building.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" asChild>
            <Link to="/products">View products page</Link>
          </Button>
          <Button variant="outline" className="gap-2" type="button" onClick={exportJson}>
            <Download className="h-4 w-4" />
            Export JSON
          </Button>
          <Button
            variant="outline"
            className="gap-2"
            type="button"
            onClick={() => importInputRef.current?.click()}
          >
            <Upload className="h-4 w-4" />
            Import JSON
          </Button>
          <input
            ref={importInputRef}
            type="file"
            accept="application/json,.json"
            className="sr-only"
            aria-hidden
            tabIndex={-1}
            onChange={onImportFile}
          />
          <Button variant="outline" className="gap-2" onClick={() => logout()}>
            <LogOut className="h-4 w-4" />
            Log out
          </Button>
        </div>
      </div>

      <Card className="mb-10">
        <CardHeader>
          <CardTitle className="font-display text-xl">Edit About page</CardTitle>
          <CardDescription>
            Update the About page text without coding. Changes save in this browser. Use reset to restore defaults.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="grid gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              const normalized = { ...defaultAboutContent(), ...aboutDraft, version: 1 as const };
              setAbout(normalized);
              toast.success("About page updated");
            }}
          >
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-1.5">
                <Label htmlFor="about-header-label">Header label</Label>
                <Input
                  id="about-header-label"
                  value={aboutDraft.headerLabel}
                  onChange={(e) => setAboutDraft({ ...aboutDraft, headerLabel: e.target.value })}
                />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="about-header-title">Header title</Label>
                <Input
                  id="about-header-title"
                  value={aboutDraft.headerTitle}
                  onChange={(e) => setAboutDraft({ ...aboutDraft, headerTitle: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="about-header-desc">Header description</Label>
              <Textarea
                id="about-header-desc"
                rows={3}
                value={aboutDraft.headerDescription}
                onChange={(e) => setAboutDraft({ ...aboutDraft, headerDescription: e.target.value })}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="about-story-title">Story title</Label>
                <Input
                  id="about-story-title"
                  value={aboutDraft.storyTitle}
                  onChange={(e) => setAboutDraft({ ...aboutDraft, storyTitle: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="about-vision-heading">Vision heading</Label>
                <Input
                  id="about-vision-heading"
                  value={aboutDraft.visionHeading}
                  onChange={(e) => setAboutDraft({ ...aboutDraft, visionHeading: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="about-story-1">Story paragraph 1</Label>
              <Textarea
                id="about-story-1"
                rows={4}
                value={aboutDraft.storyParagraph1}
                onChange={(e) => setAboutDraft({ ...aboutDraft, storyParagraph1: e.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="about-story-2">Story paragraph 2</Label>
              <Textarea
                id="about-story-2"
                rows={4}
                value={aboutDraft.storyParagraph2}
                onChange={(e) => setAboutDraft({ ...aboutDraft, storyParagraph2: e.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="about-vision-para">Vision paragraph</Label>
              <Textarea
                id="about-vision-para"
                rows={3}
                value={aboutDraft.visionParagraph}
                onChange={(e) => setAboutDraft({ ...aboutDraft, visionParagraph: e.target.value })}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="about-future-heading">Future heading</Label>
                <Input
                  id="about-future-heading"
                  value={aboutDraft.futureHeading}
                  onChange={(e) => setAboutDraft({ ...aboutDraft, futureHeading: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="about-future-para">Future paragraph</Label>
                <Textarea
                  id="about-future-para"
                  rows={3}
                  value={aboutDraft.futureParagraph}
                  onChange={(e) => setAboutDraft({ ...aboutDraft, futureParagraph: e.target.value })}
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button type="submit" className="gold-gradient text-primary-foreground">
                Save About page
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  resetAbout();
                  toast.message("About page reset to defaults");
                }}
              >
                Reset About page
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className="mb-10">
        <CardHeader>
          <CardTitle className="font-display text-xl">Edit Home Page Stats</CardTitle>
          <CardDescription>
            Update the statistics shown on the home page (Years Experience, Happy Customers, Tons Monthly Output, Oil Varieties).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="grid gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              setHome({ ...home, stats: statsDraft });
              toast.success("Stats updated");
            }}
          >
            {statsDraft.map((stat, index) => (
              <div key={index} className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor={`stat-value-${index}`}>Value</Label>
                  <Input
                    id={`stat-value-${index}`}
                    value={stat.value}
                    onChange={(e) => {
                      const newStats = [...statsDraft];
                      newStats[index] = { ...stat, value: e.target.value };
                      setStatsDraft(newStats);
                    }}
                    placeholder="e.g. 25+"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor={`stat-label-${index}`}>Label</Label>
                  <Input
                    id={`stat-label-${index}`}
                    value={stat.label}
                    onChange={(e) => {
                      const newStats = [...statsDraft];
                      newStats[index] = { ...stat, label: e.target.value };
                      setStatsDraft(newStats);
                    }}
                    placeholder="e.g. Years Experience"
                  />
                </div>
              </div>
            ))}
            <div className="flex flex-wrap gap-2">
              <Button type="submit" className="gold-gradient text-primary-foreground">
                Save Stats
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  resetHome();
                  toast.message("Stats reset to defaults");
                }}
              >
                Reset Stats
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className="mb-10">
        <CardHeader>
          <CardTitle className="font-display text-xl">Edit Testimonials</CardTitle>
          <CardDescription>
            Add, edit, or delete customer reviews shown on the home page.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {testimonialsDraft.map((testimonial, index) => (
              <div key={testimonial.id} className="rounded-xl border bg-card p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Review #{index + 1}
                  </span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-8 gap-1 text-destructive hover:text-destructive"
                    onClick={() => {
                      const newTestimonials = testimonialsDraft.filter((t) => t.id !== testimonial.id);
                      setTestimonialsDraft(newTestimonials);
                    }}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Delete
                  </Button>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor={`testimonial-name-${testimonial.id}`}>Name</Label>
                    <Input
                      id={`testimonial-name-${testimonial.id}`}
                      value={testimonial.name}
                      onChange={(e) => {
                        const newTestimonials = [...testimonialsDraft];
                        newTestimonials[index] = { ...testimonial, name: e.target.value };
                        setTestimonialsDraft(newTestimonials);
                      }}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor={`testimonial-role-${testimonial.id}`}>Role</Label>
                    <Input
                      id={`testimonial-role-${testimonial.id}`}
                      value={testimonial.role}
                      onChange={(e) => {
                        const newTestimonials = [...testimonialsDraft];
                        newTestimonials[index] = { ...testimonial, role: e.target.value };
                        setTestimonialsDraft(newTestimonials);
                      }}
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor={`testimonial-text-${testimonial.id}`}>Review</Label>
                  <Textarea
                    id={`testimonial-text-${testimonial.id}`}
                    rows={3}
                    value={testimonial.text}
                    onChange={(e) => {
                      const newTestimonials = [...testimonialsDraft];
                      newTestimonials[index] = { ...testimonial, text: e.target.value };
                      setTestimonialsDraft(newTestimonials);
                    }}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor={`testimonial-rating-${testimonial.id}`}>Rating (1-5)</Label>
                  <Select
                    value={String(testimonial.rating)}
                    onValueChange={(v) => {
                      const newTestimonials = [...testimonialsDraft];
                      newTestimonials[index] = { ...testimonial, rating: parseInt(v) };
                      setTestimonialsDraft(newTestimonials);
                    }}
                  >
                    <SelectTrigger id={`testimonial-rating-${testimonial.id}`}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5].map((r) => (
                        <SelectItem key={r} value={String(r)}>
                          {r} Star{r !== 1 ? "s" : ""}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              className="w-full gap-2"
              onClick={() => {
                const newTestimonial: Testimonial = {
                  id: Date.now().toString(),
                  name: "",
                  role: "",
                  text: "",
                  rating: 5,
                };
                setTestimonialsDraft([...testimonialsDraft, newTestimonial]);
              }}
            >
              <Plus className="h-4 w-4" />
              Add Testimonial
            </Button>
            <div className="flex flex-wrap gap-2 pt-4 border-t">
              <Button
                type="button"
                className="gold-gradient text-primary-foreground"
                onClick={() => {
                  setHome({ ...home, testimonials: testimonialsDraft });
                  toast.success("Testimonials updated");
                }}
              >
                Save Testimonials
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  resetHome();
                  toast.message("Testimonials reset to defaults");
                }}
              >
                Reset Testimonials
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-10">
        <CardHeader>
          <CardTitle className="font-display text-xl">Edit Manufacturing Stats</CardTitle>
          <CardDescription>
            Update the statistics shown on the Manufacturing page (Years, Packaging, Tons/Month).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="grid gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              setAbout({ ...about, manufacturingStats: manufacturingStatsDraft });
              toast.success("Manufacturing stats updated");
            }}
          >
            {manufacturingStatsDraft.map((stat, index) => (
              <div key={index} className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor={`mfg-stat-value-${index}`}>Value</Label>
                  <Input
                    id={`mfg-stat-value-${index}`}
                    value={stat.value}
                    onChange={(e) => {
                      const newStats = [...manufacturingStatsDraft];
                      newStats[index] = { ...stat, value: e.target.value };
                      setManufacturingStatsDraft(newStats);
                    }}
                    placeholder="e.g. 25+"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor={`mfg-stat-label-${index}`}>Label</Label>
                  <Input
                    id={`mfg-stat-label-${index}`}
                    value={stat.label}
                    onChange={(e) => {
                      const newStats = [...manufacturingStatsDraft];
                      newStats[index] = { ...stat, label: e.target.value };
                      setManufacturingStatsDraft(newStats);
                    }}
                    placeholder="e.g. Years"
                  />
                </div>
              </div>
            ))}
            <div className="flex flex-wrap gap-2">
              <Button type="submit" className="gold-gradient text-primary-foreground">
                Save Manufacturing Stats
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  resetAbout();
                  toast.message("Manufacturing stats reset to defaults");
                }}
              >
                Reset Manufacturing Stats
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className="mb-10">
        <CardHeader>
          <CardTitle className="font-display text-xl">Edit Manufacturing Image</CardTitle>
          <CardDescription>
            Update the factory image shown on the Manufacturing page.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="mfg-image-url">Image URL</Label>
              <Input
                id="mfg-image-url"
                value={manufacturingImage}
                onChange={(e) => setManufacturingImage(e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                className="flex-1 gap-2"
                onClick={() => manufacturingFileInputRef.current?.click()}
              >
                <Upload className="h-4 w-4" />
                Upload from device
              </Button>
              <input
                ref={manufacturingFileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const reader = new FileReader();
                  reader.onload = (event) => {
                    setManufacturingImage(event.target?.result as string);
                  };
                  reader.readAsDataURL(file);
                }}
              />
            </div>
            {manufacturingImage && (
              <div className="mt-2">
                <img src={manufacturingImage} alt="Preview" className="h-40 w-full object-cover rounded border" />
              </div>
            )}
            <div className="flex flex-wrap gap-2 pt-4 border-t">
              <Button
                type="button"
                className="gold-gradient text-primary-foreground"
                onClick={() => {
                  setAbout({ ...about, manufacturingImage });
                  toast.success("Manufacturing image updated");
                }}
              >
                Save Manufacturing Image
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  resetAbout();
                  toast.message("Manufacturing image reset to defaults");
                }}
              >
                Reset Manufacturing Image
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-10">
        <CardHeader>
          <CardTitle className="font-display text-xl">Edit About Page Image & Stats</CardTitle>
          <CardDescription>
            Update the factory image and "Years of Trust" stats shown on the About page.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="about-image-url">About Page Image URL</Label>
              <Input
                id="about-image-url"
                value={aboutImage}
                onChange={(e) => setAboutImage(e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                className="flex-1 gap-2"
                onClick={() => aboutFileInputRef.current?.click()}
              >
                <Upload className="h-4 w-4" />
                Upload from device
              </Button>
              <input
                ref={aboutFileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const reader = new FileReader();
                  reader.onload = (event) => {
                    setAboutImage(event.target?.result as string);
                  };
                  reader.readAsDataURL(file);
                }}
              />
            </div>
            {aboutImage && (
              <div className="mt-2">
                <img src={aboutImage} alt="Preview" className="h-40 w-full object-cover rounded border" />
              </div>
            )}
            <div className="grid gap-4 sm:grid-cols-2 pt-4 border-t">
              <div className="space-y-1.5">
                <Label htmlFor="about-years-value">Years Value</Label>
                <Input
                  id="about-years-value"
                  value={aboutYearsValue}
                  onChange={(e) => setAboutYearsValue(e.target.value)}
                  placeholder="e.g. 25+"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="about-years-label">Years Label</Label>
                <Input
                  id="about-years-label"
                  value={aboutYearsLabel}
                  onChange={(e) => setAboutYearsLabel(e.target.value)}
                  placeholder="e.g. Years of Trust"
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-2 pt-4 border-t">
              <Button
                type="button"
                className="gold-gradient text-primary-foreground"
                onClick={() => {
                  setAbout({ ...about, aboutImage, aboutYearsValue, aboutYearsLabel });
                  toast.success("About page image and stats updated");
                }}
              >
                Save About Image & Stats
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  resetAbout();
                  toast.message("About page image and stats reset to defaults");
                }}
              >
                Reset About Image & Stats
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-10">
        <CardHeader>
          <CardTitle className="font-display text-xl">Edit Phone Numbers</CardTitle>
          <CardDescription>
            Update the contact phone numbers shown on the Contact page and Footer. Clicking them will initiate a call.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              setAbout({ ...about, phoneNumber1, phoneNumber2 });
              toast.success("Phone numbers updated");
            }}
          >
            <div className="space-y-1.5">
              <Label htmlFor="phone-number-1">Phone Number 1</Label>
              <Input
                id="phone-number-1"
                value={phoneNumber1}
                onChange={(e) => setPhoneNumber1(e.target.value)}
                placeholder="+91 XXXXX XXXXX"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="phone-number-2">Phone Number 2</Label>
              <Input
                id="phone-number-2"
                value={phoneNumber2}
                onChange={(e) => setPhoneNumber2(e.target.value)}
                placeholder="+91 XXXXX XXXXX"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Button type="submit" className="gold-gradient text-primary-foreground">
                Save Phone Numbers
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  resetAbout();
                  toast.message("Phone numbers reset to defaults");
                }}
              >
                Reset Phone Numbers
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-6 mb-10">
        <h2 className="font-display text-lg font-semibold">Current oils ({products.length})</h2>
        {products.map((p) => (
          <div key={p.id}>
            {isBuiltInProductId(p.id) ? <BuiltInProductEditor product={p} /> : <CustomProductEditor product={p} />}
          </div>
        ))}
      </div>

      <AddOilForm />

      <div className="mt-10 rounded-xl border border-destructive/30 bg-destructive/5 p-6">
        <h3 className="font-semibold text-destructive mb-2">Danger zone</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Clear all custom oils and restore every built-in name and price to the originals from when the site was built.
        </p>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="sm">
              Reset entire catalog
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Reset everything?</AlertDialogTitle>
              <AlertDialogDescription>
                This removes all oils you added and clears all price and name edits. This cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                onClick={() => {
                  resetEntireCatalog();
                  toast.success("Catalog reset");
                }}
              >
                Yes, reset
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}

function AdminLogin() {
  const { login } = useAdminAuth();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = login(password);
    if (!ok) {
      setError(true);
      toast.error("Wrong password");
      return;
    }
    setError(false);
    toast.success("Welcome back");
  };

  return (
    <div className="container mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 pb-20 pt-28">
      <Button variant="ghost" className="mb-6 w-fit gap-2 -ml-2" asChild>
        <Link to="/about">
          <ArrowLeft className="h-4 w-4" />
          Back to About
        </Link>
      </Button>
      <Card>
        <CardHeader className="text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full gold-gradient">
            <Lock className="h-5 w-5 text-primary-foreground" />
          </div>
          <CardTitle className="font-display text-2xl">Admin login</CardTitle>
          <CardDescription>Sign in to update oil names and prices for your website.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="admin-password">Password</Label>
              <Input
                id="admin-password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                className={error ? "border-destructive" : ""}
                placeholder="Enter admin password"
              />
            </div>
            <Button type="submit" className="w-full gold-gradient text-primary-foreground">
              Sign in
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

const Admin = () => {
  const { isAuthenticated } = useAdminAuth();
  return isAuthenticated ? <AdminDashboard /> : <AdminLogin />;
};

export default Admin;
