import { Request, Response } from "express";
import {
  createCategoryService,
  getCategoriesService,
  updateCategoryService,
  deleteCategoryService,
  createMenuItemService,
  updateMenuItemService,
  deleteMenuItemService,
  updateMenuItemAvailabilityService,
  getMenuItemsService
} from "./menu.service.js";

export async function createCategory(
  req: Request,
  res: Response
): Promise<Response | void> {
  try {

    const { name } = req.body;

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = req.user.userId;

    const category = await createCategoryService(
      name,
      userId
    );

    res.status(201).json({
      message: "Category created successfully",
      category
    });

  } catch(error) {

    console.error(error);

    res.status(400).json({
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong"
    });

  }
}

export async function getCategories(
  req: Request,
  res: Response
): Promise<Response | void> {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = req.user.userId;
    const categories = await getCategoriesService(userId);

    res.status(200).json({
      message: "Categories fetched successfully",
      categories
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong"
    });
  }
}

export async function updateCategory(
  req: Request,
  res: Response
): Promise<Response | void> {
  try {
    const { id } = req.params;
    let idStr: string | undefined = id as any;
    if (Array.isArray(idStr)) idStr = idStr[0];
    const { name } = req.body;
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = req.user.userId;

    if (!idStr) {
      return res.status(400).json({
        message: "Category id is required"
      });
    }

    const category = await updateCategoryService(idStr, name, userId);

    res.status(200).json({
      message: "Category updated successfully",
      category
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong"
    });
  }
}
export async function deleteCategory(
  req: Request,
  res: Response
): Promise<Response | void> {
  try {
    const { id } = req.params;
    let idStr: string | undefined = id as any;
    if (Array.isArray(idStr)) idStr = idStr[0];
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = req.user.userId;

    if (!idStr) {
      return res.status(400).json({
        message: "Category id is required"
      });
    }

    const result = await deleteCategoryService(
      idStr,
      userId
    );

    res.status(200).json({
      message: "Category deleted successfully",
      result
    });

  } catch(error) {
    console.error(error);

    res.status(500).json({
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong"
    });
  }
}


export async function createMenuItem(
  req: Request,
  res: Response
): Promise<Response | void> {
  try {

    const { name, description, price } = req.body;
    let { categoryId } = req.body;

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = req.user.userId;

    // normalize categoryId if array
    if (Array.isArray(categoryId)) {
      categoryId = categoryId[0];
    }

    if (!categoryId || typeof categoryId !== "string") {
      return res.status(400).json({ message: "categoryId is required" });
    }


    const menuItem = await createMenuItemService(
      name,
      description,
      price,
      categoryId as string,
      userId
    );


    res.status(201).json({
      message: "Menu item created successfully",
      menuItem
    });


  } catch(err) {

    console.error(err);

    res.status(500).json({
      message:
        err instanceof Error
          ? err.message
          : "Something went wrong"
    });

  }
}

export async function updateMenuItem(
  req: Request,
  res: Response
): Promise<Response | void> {
  try {

    const { id } = req.params;
    let idStr: string | undefined = id as any;
    if (Array.isArray(idStr)) idStr = idStr[0];

    const { name, description, price } = req.body;
    let { categoryId } = req.body;

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = req.user.userId;

    if (Array.isArray(categoryId)) {
      categoryId = categoryId[0];
    }


    const updatedMenuItem =
      await updateMenuItemService(
        idStr as string,
        name,
        description,
        price,
        categoryId as string,
        userId
      );


    res.status(200).json({
      message: "Menu item updated successfully",
      menuItem: updatedMenuItem
    });


  } catch(error) {

    console.error(error);

    res.status(500).json({
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong"
    });

  }
}

export async function deleteMenuItem(
  req: Request,
  res: Response
): Promise<Response | void> {
  try {
  const {id} = req.params;
   if (!req.user) {
     return res.status(401).json({ message: "Unauthorized" });
   }
   const userId = req.user.userId;
   let idStr: string | undefined = id as any;
   if (Array.isArray(idStr)) idStr = idStr[0];
   if (!idStr) {
     return res.status(400).json({
       message: "Menu item id is required"
     });
   }
  const menuItem = await deleteMenuItemService(
  idStr,
  userId
);
    res.status(200).json({
  message: "Menu item deleted successfully",
  menuItem
});
  } catch (error) {
     console.error(error);
      res.status(500).json({
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong"
      });
  }
}

export async function updateMenuItemAvailability(
  req: Request,
  res: Response
): Promise<Response | void> {
  try {

    const { id } = req.params;

    const { isAvailable } = req.body;

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = req.user.userId;


    let idStr: string | undefined = id as any;
    if (Array.isArray(idStr)) idStr = idStr[0];
    if (!idStr) {
      return res.status(400).json({ message: "Menu item id is required" });
    }

    const updatedMenuItem =
      await updateMenuItemAvailabilityService(
        idStr,
        isAvailable,
        userId
      );


    res.status(200).json({
      message: "Menu item availability updated successfully",
      menuItem: updatedMenuItem
    });


  } catch(error) {

    console.error(error);

    res.status(500).json({
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong"
    });

  }
}

export async function getMenuItems(
  req: Request,
  res: Response
): Promise<Response | void> {

  try {

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = req.user.userId;


    const menuItems =
      await getMenuItemsService(
        userId
      );


    res.status(200).json({
      message: "Menu items fetched successfully",
      menuItems
    });


  } catch(error) {

    console.error(error);

    res.status(500).json({
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong"
    });

  }
}